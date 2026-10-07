---
title: "URL Scheme"
---

# URL Scheme

Any app, script or web page can open a `yattee://` link to open something in Yattee or make it do something.

## Opening links

Any link Yattee can play works wrapped in the scheme:

| Link | Opens |
| --- | --- |
| `yattee://open?url={link}` | Any YouTube, PeerTube, direct media or Yattee Server-supported link, the same as sharing it to Yattee |
| `yattee://video/{id}` | A YouTube video. Add `?source=peertube&instance={instance URL}` for PeerTube |
| `yattee://channel/{id}` | A channel. Takes the same `source`/`instance` parameters |
| `yattee://playlist/{id}` | A playlist. Takes the same `source`/`instance` parameters |
| `yattee://search?q={query}` | Search results |

A timestamp in the link (`t`, `time` or `start`, as `90`, `90s` or `1m30s`) starts the video there. What a video link does — play, download or ask — follows **Settings → Navigation → Default Link Action**.

Links from Yattee 1.x such as `yattee://watch?v={id}` and `yattee://youtube.com/watch?v={id}` still work.

### Screens

| Link | Opens |
| --- | --- |
| `yattee://subscriptions` | Subscriptions feed |
| `yattee://bookmarks` | Bookmarks |
| `yattee://history` | Watch history |
| `yattee://playlists` | Playlists |
| `yattee://continue-watching` | Continue Watching |
| `yattee://downloads` | Downloads |
| `yattee://channels` | Subscribed channels |
| `yattee://settings` | Settings |

## Actions

Actions do something instead of opening a screen. `{link}` is any link Yattee can play — `http`, `https` or `yattee`. Percent-encode it if it has its own `&` parameters you want to keep, or pass it as-is.

| Link | Does |
| --- | --- |
| `yattee://play?url={link}&t={seconds}` | Plays the video, optionally from a time. A playlist link plays the playlist |
| `yattee://play-next?url={link}` | Queues the video, or a playlist's videos, after the current one |
| `yattee://queue?url={link}` | Adds the video, or a playlist's videos, to the end of the queue |
| `yattee://download?url={link}` | Downloads at your preferred download quality, or shows the quality picker. Not available on Apple TV |
| `yattee://bookmark?url={link}` | Bookmarks the video. A playlist link saves the playlist |
| `yattee://subscribe?url={channel link}` | Subscribes to the channel in the account you're using |
| `yattee://unsubscribe?url={channel link}` | Unsubscribes from the channel |

`play-next` and `queue` need the queue turned on in Settings.

### Player controls

These act on what's playing. When nothing is, they do nothing (and report `nothingPlaying` through [x-callback-url](./x-callback-url.md)).

| Link | Does |
| --- | --- |
| `yattee://player/play` | Resumes |
| `yattee://player/pause` | Pauses |
| `yattee://player/toggle` | Resumes or pauses |
| `yattee://player/next` / `previous` | Plays the next or previous video in the queue |
| `yattee://player/seek?t={seconds}` | Jumps to a time. Also takes `90s` or `1m30s` |
| `yattee://player/seek?by={seconds}` | Jumps forward, or back with a negative number |
| `yattee://player/rate?value={rate}` | Sets the speed: 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5 or 3 |
| `yattee://player/close` | Stops and closes the player |
| `yattee://player/state` | Changes nothing; reports what's playing through [x-callback-url](./x-callback-url.md) |

## Confirmation

Any website or app can open a `yattee://` link, so actions that change your data — queueing, bookmarking, downloading, subscribing — ask first. If you only use them from your own automations, turn on **Settings → Navigation → Run Link Actions Without Asking**. Playing and player controls never ask.

On Apple TV, tvOS itself also asks "Open in Yattee?" when another app sends a link while it is in front. That prompt comes from the system and can't be turned off.

## Examples

```
yattee://play?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1m30s
yattee://queue?url=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPL...
yattee://player/seek?by=-15
yattee://search?q=swiftui
```

From Terminal on a Mac:

```bash
open "yattee://player/toggle"
```

## Home automation

Tools that can open a URL on an Apple TV — for example `launch_app` in [pyatv](https://pyatv.dev) or Home Assistant's Apple TV integration, which uses it — can run any link above, such as `yattee://player/pause` or `yattee://play?url={link}`.

```bash
atvremote --id {device} launch_app=yattee://player/pause
```
