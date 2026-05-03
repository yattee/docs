---
sidebar_position: 5
title: "Stream Proxying"
---

# Stream Proxying

Yattee Server can deliver video stream URLs in three different shapes. The right choice depends on whether the client can reach the content provider's CDN directly, and whether bandwidth or disk pressure on the server is a concern.

This page explains *why* proxying exists, how the modes differ, and how the **server-side site flag** and the **per-source toggle in the iOS/macOS client** combine.

## Why proxy at all

When the server extracts a stream (via Invidious, InnerTube, or yt-dlp), the URL it gets back from YouTube's CDN can be tied to the IP address that performed the extraction. Two common ways this bites you:

- **IP binding.** googlevideo URLs include an `ip=` parameter or have signature elements derived from the requestor's IP. If the server extracts from one network and the client streams from another (a phone on cellular hitting a server in a homelab, anything via a VPN or tunnel), the CDN may return **HTTP 403** for the stream.
- **Cookie / header requirements.** Some sites require Set-Cookie state, a referrer, or a custom User-Agent to serve segments. The server has all of that during extraction; the client doesn't.

Proxying solves both: the client talks to your yattee-server, and yattee-server talks to the CDN — so the CDN only ever sees the server's IP and headers, which match what was used to mint the URL.

There are also non-functional reasons:

- **Privacy.** The content provider sees the server's IP, not every client's.
- **Network reachability.** Clients behind restrictive firewalls can stream as long as they can reach the server.
- **Avoid mixed-content / TLS issues** for sites that serve plain HTTP.

The cost is **bandwidth doubling** (every byte traverses the server) and, for one of the modes, disk usage on the server.

## The two endpoints

Yattee Server exposes two distinct proxy paths under `/proxy/`. Each is the right shape for a different workload.

### `/proxy/relay` -- byte relay (playback)

A transparent HTTP proxy. The converter mints a URL of the form

```
https://your-server/proxy/relay?url=<upstream>&sig=<hmac>&exp=<unix-ts>
```

at extraction time. When the client requests it, the relay validates the signature, opens an upstream connection to `<upstream>`, and pipes bytes back. It supports HTTP **Range / If-Range / If-None-Match** so seeking and partial reads work normally.

For HLS manifests, the response body is buffered and segment URLs inside the playlist are rewritten to fresh signed `/proxy/relay` URLs, so segments also flow through the server. (Otherwise individual segments would still hit googlevideo directly with the same IP-mismatch problem.)

Properties:

- **Fast time-to-first-byte** -- the relay starts streaming as soon as upstream sends headers, no buffering to disk.
- **Seek works** -- Range passthrough, no full-file download.
- **No yt-dlp re-extraction** -- the URL extracted at API time is what gets relayed, so URLs that yt-dlp can't re-extract (for example, ended live streams) still work as long as the original extractor (Invidious, InnerTube) gave a usable URL.
- **No on-disk cache** -- nothing is written to `/downloads`.

This is the right shape for **playback**.

### `/proxy/fast/{video_id}?itag=...` -- yt-dlp download (downloads)

Re-runs yt-dlp on the server, downloads the requested itag to `/downloads/{id}_{itag}.{ext}` using yt-dlp's parallel-fragment downloader, then streams the file to the client as it's being written.

Properties:

- **Cached on disk** -- repeated requests for the same itag reuse the file.
- **Uses yt-dlp's parallel downloader** -- often faster aggregate throughput than a single relay connection.
- **Re-extracts on every cold request** -- can fail if yt-dlp can't extract the video at request time (for example, ended live streams return `This live event has ended`).
- **No HTTP Range support** -- seeks restart the download.
- **Higher time-to-first-byte** -- yt-dlp has to make progress before the response can begin streaming.

This is the right shape for **downloads**, where caching the whole file is desirable and TTFB doesn't matter.

## Modes on `/api/v1/videos/{id}`

The video endpoint accepts `?proxy=true|false` and `?proxy_mode=relay|download|off`:

| `proxy_mode` | Stream URLs the API returns |
|---|---|
| `relay` (default for playback) | Signed `/proxy/relay?url=...` URLs |
| `download` | Legacy `/proxy/fast/{id}?itag=...` URLs |
| `off` | Direct upstream URLs (CDN or Invidious) -- equivalent to `proxy=false` |

The iOS/macOS client picks the mode automatically: `relay` when fetching streams for the player, `download` when fetching streams for the **Save Offline** flow.

## Per-site flag (operator-level)

Each entry on the [Sites](./sites.md) page has a **Proxy Streaming** boolean. This is the **server-wide default** for that extractor:

- **On** -- when a client hits `/api/v1/videos/{id}` without a `?proxy=` query, the server proxies by default. Mode defaults to `relay` unless the client requests something else.
- **Off** -- the server returns direct URLs by default. Clients can still force proxying by passing `?proxy=true`.

The flag is per-site so you can, for example, proxy YouTube but leave Vimeo direct.

## Per-source toggle (client-level)

In the iOS/macOS app, **Sources -> Edit Source -> Proxy** has a **Proxy streams through this instance** toggle. It's per-source, so you can have one Yattee Server source proxied (off-LAN phone) and another direct (a separate instance only used on the LAN).

When the toggle is **on**, the client sends `?proxy=true&proxy_mode=relay` for playback fetches. When **off**, it sends nothing and lets the server's site flag decide.

## How the two interact

| Client toggle | Server site flag | Result |
|---|---|---|
| **on** | on | Proxied (`/proxy/relay`) |
| **on** | off | **Client wins** -- proxied (`/proxy/relay`) |
| off | on | **Server site flag wins** -- proxied |
| off | off | Direct CDN URLs |

The asymmetry: client **off** doesn't actively disable proxying. The server's site flag is treated as a *default* that the client can override upward (force on) but doesn't override downward. The reasoning is that an operator who set the site flag to "always proxy" usually means it -- there's typically a network reason behind that choice.

If you want to force proxying off from a specific client, set the server site flag off and rely on the client's force-on behavior for sources that need it. (A client-side "force off" override is not currently exposed in the app.)

## Capacity tuning

When proxying is on -- in either mode -- two server settings are worth knowing about. See [Server Settings -> Proxy Downloads](./settings.md#proxy-downloads).

| Setting | What it controls |
|---|---|
| `proxy_max_concurrent_downloads` | Cap on simultaneous `/proxy/fast/` downloads. The relay path is uncapped (it's just one async HTTP connection per stream). |
| `proxy_download_max_age` | TTL for cached `/proxy/fast/` files in `/downloads`. The relay never writes to disk, so this only affects download caching. |

For a personal instance with a few clients, defaults are fine. For larger deployments watch:

- **Outbound bandwidth** from the server (every byte goes server -> client *and* CDN -> server, so peak utilisation roughly doubles compared to direct).
- **Disk pressure on `/downloads`** if you make heavy use of the Save Offline flow on large files.

## Security

- **Signed relay URLs** are HMAC-SHA256 over `url:exp` keyed by the server's stream-token secret (the same key that signs `/proxy/fast/?token=...`). They expire after 6 hours by default.
- **SSRF guard.** Even with a valid signature, the relay refuses URLs that resolve to private IP ranges (RFC1918, link-local, loopback). The signature already prevents arbitrary URL submission, but this is defence-in-depth.
- **Upstream credentials are stripped.** Cookies and Authorization headers are never forwarded from the client to the upstream CDN, and Set-Cookie is dropped from upstream responses.

## Picking a default

If you're not sure:

- **Self-hosted, off-LAN clients common (phone on cellular, VPN, etc.):** keep proxying **on**. The relay's overhead is small compared to the cost of 403s and re-extractions.
- **Self-hosted, only LAN clients:** turn the per-site flag **off** to save bandwidth. Direct CDN streams are the fastest path.
- **Mixed:** leave the per-site flag **off** server-side, and let users flip the per-source toggle on for the sources that need it.

## See also

- [Site Configuration](./sites.md) -- where the per-extractor proxy flag lives.
- [Server Settings -> Proxy Downloads](./settings.md#proxy-downloads) -- capacity tuning.
- [Security & Privacy](../security.md) -- broader trust model.
