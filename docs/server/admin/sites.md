---
sidebar_position: 3
title: "Site Configuration"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Site Configuration

Yattee Server uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) as its extraction engine, which supports over 1000 websites. The **Sites** tab in the admin panel controls which of these sites are enabled on your server and how they behave.

<ScreenshotPlaceholder description="Admin panel Sites tab showing the list of configured sites with name, extractor pattern, enabled status, priority, and proxy streaming toggle" />

## How Sites Work

When a client sends a URL to the server for extraction, the server checks it against the list of configured sites. If a matching, enabled site is found, the extraction proceeds. If no match is found and `allow_all_sites_for_extraction` is disabled (the default), the request is rejected.

This gives you fine-grained control over what content your server processes.

## Default Configuration

A fresh Yattee Server installation comes with **YouTube** pre-configured:

| Field | Value |
|-------|-------|
| Name | YouTube |
| Extractor Pattern | `youtube` |
| Enabled | Yes |
| Priority | 100 |
| Proxy Streaming | No |

## Site Fields

Each site entry has the following fields:

| Field | Description |
|-------|-------------|
| **Name** | A human-readable label for the site (e.g., "YouTube", "TikTok"). This is for display purposes only. |
| **Extractor Pattern** | A pattern matched against yt-dlp extractor names to determine if this site configuration applies to a given URL. See [Extractor Pattern Matching](#extractor-pattern-matching) below. |
| **Enabled** | Whether this site is active. Disabled sites are ignored during URL matching. |
| **Priority** | A numeric value that determines the order in which sites are checked for credential matching. Higher priority sites are checked first. |
| **Proxy Streaming** | Whether video streams for this site should be proxied through the server. See [Proxy Streaming](#proxy-streaming) below. |

## Extractor Pattern Matching

The extractor pattern is matched against the extractor name that yt-dlp assigns to a URL. Patterns support wildcards:

| Pattern | Matches |
|---------|---------|
| `youtube` | Exact match -- only the extractor named "youtube" |
| `*twitter*` | Contains -- any extractor with "twitter" in its name |
| `twitter*` | Starts with -- extractors starting with "twitter" |
| `*twitter` | Ends with -- extractors ending with "twitter" |

:::tip
If you are unsure what extractor name yt-dlp uses for a site, you can run `yt-dlp --list-extractors` to see the full list. Extractor names are case-sensitive.
:::

## Adding a Site

### From the Popular Sites List

The admin panel includes a dropdown of **popular pre-configured sites** that you can add with a single click. Each entry comes with a suggested extractor pattern, recommended proxy streaming setting, and credential type hints.

Available pre-configured sites include:

- **YouTube** -- `youtube`
- **TikTok** -- `*tiktok*`
- **Twitter / X** -- `*twitter*`
- **Instagram** -- `*instagram*`
- **Facebook** -- `*facebook*`
- **Twitch** -- `*twitch*`
- **Vimeo** -- `*vimeo*`
- **Dailymotion** -- `*dailymotion*`
- **Reddit** -- `*reddit*`
- **SoundCloud** -- `*soundcloud*`

Each popular site entry also includes an example URL you can use to test extraction after setup.

### Manually

1. Click **Add Site**.
2. Enter a **Name** and **Extractor Pattern**.
3. Set the **Priority** (higher values are matched first).
4. Toggle **Proxy Streaming** if needed.
5. Click **Save**.

## Proxy Streaming

The proxy streaming toggle controls how video stream URLs are delivered to clients:

| Mode | Behavior | Use When |
|------|----------|----------|
| **Disabled** (default for YouTube) | The server returns direct CDN URLs to the client. The client connects to the content provider directly to stream the video. | The site allows direct streaming from its CDN without IP restrictions or cookie requirements. This is the most bandwidth-efficient option for the server. |
| **Enabled** | Video streams are downloaded by the server and relayed to the client. The client streams from your server, not from the original CDN. | The site blocks client IPs, requires cookies or authentication headers for streaming, or you want to keep client IP addresses private from content providers. |

:::info
Proxy streaming increases server bandwidth and disk usage since all video data passes through your server. The temporary files are stored in the downloads volume and cleaned up based on the `proxy_download_max_age` setting. See [Server Settings](./settings.md#proxy-downloads) for details.
:::

## Testing a Site

After configuring a site (and optionally adding credentials for it), use the **Test** button to verify that extraction works. The test performs a real yt-dlp extraction against a sample URL for that site, confirming that:

- The extractor pattern matches correctly
- Any configured credentials are accepted
- The site returns valid stream data

:::note
Testing uses an actual yt-dlp extraction, so it may take a few seconds depending on the site and your server's connection speed.
:::

## Extraction Scope

By default, only URLs matching a **configured and enabled** site are accepted for extraction. This is controlled by the `allow_all_sites_for_extraction` setting:

| Setting Value | Behavior |
|---------------|----------|
| `false` (default) | Only URLs matching an enabled site entry are processed. All other URLs are rejected. |
| `true` | Any URL that yt-dlp recognizes is processed, regardless of whether a site entry exists. Site entries are still used for credential matching and proxy streaming decisions. |

You can change this setting in the [Server Settings](./settings.md#extraction) page.

:::warning
When `allow_all_sites_for_extraction` is disabled, make sure all sites you want to use are both **configured** and **enabled**. A configured but disabled site will still reject URLs.
:::

## Credentials

Sites that require authentication (age-restricted content, premium videos, private content) need credentials configured separately. Credentials are linked to sites by extractor pattern and priority.

For full details on setting up cookies, usernames/passwords, and OAuth tokens for your sites, see the [Credentials & Security](./credentials.md) page.

## Next Steps

- [Credentials & Security](./credentials.md) -- Configure authentication for sites that require login
- [Server Settings](./settings.md) -- Adjust cache TTLs, extraction scope, and proxy download limits
