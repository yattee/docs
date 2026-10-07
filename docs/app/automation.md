---
sidebar_position: 3
title: "Automation: URL Scheme, x-callback-url and Shortcuts"
---

# Automation

Yattee can be driven from other apps, Shortcuts, Siri and home automation through the `yattee://` URL scheme, x-callback-url and Shortcuts actions.

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

`yattee://subscriptions`, `yattee://bookmarks`, `yattee://history`, `yattee://playlists`, `yattee://continue-watching`, `yattee://downloads`, `yattee://channels` and `yattee://settings`.

## Actions

Actions do something instead of opening a screen. `{link}` is any link Yattee can play — percent-encode it if it has its own `&` parameters you want to keep, or pass it as-is.

| Link | Does |
| --- | --- |
| `yattee://play?url={link}&t={seconds}` | Plays the video, optionally from a time |
| `yattee://play-next?url={link}` | Queues the video after the current one |
| `yattee://queue?url={link}` | Adds the video to the end of the queue |
| `yattee://download?url={link}` | Downloads at your preferred download quality, or shows the quality picker |
| `yattee://bookmark?url={link}` | Bookmarks the video |
| `yattee://subscribe?url={channel link}` | Subscribes to the channel in the account you're using |
| `yattee://unsubscribe?url={channel link}` | Unsubscribes from the channel |

### Player controls

| Link | Does |
| --- | --- |
| `yattee://player/play` | Resumes |
| `yattee://player/pause` | Pauses |
| `yattee://player/toggle` | Resumes or pauses |
| `yattee://player/next` / `previous` | Plays the next or previous video in the queue |
| `yattee://player/seek?t={seconds}` | Jumps to a time |
| `yattee://player/seek?by={seconds}` | Jumps forward, or back with a negative number |
| `yattee://player/rate?value={rate}` | Sets the speed: 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5 or 3 |
| `yattee://player/close` | Stops and closes the player |
| `yattee://player/state` | Changes nothing; reports what's playing through x-callback-url |

### Confirmation

Any website or app can open a `yattee://` link, so actions that change your data — queueing, bookmarking, downloading, subscribing — ask first. If you only use them from your own automations, turn on **Settings → Navigation → Run Link Actions Without Asking**. Playing and player controls never ask.

On Apple TV, tvOS itself also asks "Open in Yattee?" when another app sends a link while it is in front. That prompt comes from the system and can't be turned off.

## x-callback-url

Every action also works as [x-callback-url](https://x-callback-url.com), so the calling app learns how it went:

```
yattee://x-callback-url/{action}?{parameters}&x-success={url}&x-error={url}&x-cancel={url}
```

`{action}` is any action above: `play`, `queue`, `player/pause`, `player/state` and so on.

x-callback-url works on iPhone, iPad and Mac. Apple TV runs the action but can't open the callbacks.

- **x-success** is opened when the action finishes, with these added to its query where they apply: `videoID`, `title`, `channel`, `channelID`, and for player actions `playing`, `position`, `duration` and `rate`.
- **x-error** is opened with `errorCode` and `errorMessage` when it fails — for example `noSource`, `nothingPlaying`, `queueDisabled` or `unsupportedAction`.
- **x-cancel** is opened when you decline a confirmation. Without it, x-error is opened with `errorCode=cancelled`.

For example, to get what's playing:

```
yattee://x-callback-url/player/state?x-success=shortcuts://x-callback-url/run-shortcut?name=Now%20Playing
```

## Shortcuts and Siri

The Shortcuts app lists Yattee's actions under **Yattee**: Play Video, Add Video to Queue, Download Video, Bookmark Video, Subscribe to Channel, Unsubscribe from Channel, Control Player, Seek, Set Playback Speed, Get Now Playing, Open Section and Search Videos. They don't ask for confirmation, because you built the shortcut yourself.

You can also ask Siri:

- "Pause Yattee", "Resume Yattee", "Skip in Yattee", "Previous Video in Yattee", "Close Player in Yattee"
- "What's playing in Yattee"
- "Open Subscriptions in Yattee", "Show my Watch History in Yattee"
- "Search Yattee"

## Home automation

Tools that can open a URL on an Apple TV — for example `launch_app` in [pyatv](https://pyatv.dev) or Home Assistant's Apple TV integration, which uses it — can run any link above, such as `yattee://player/pause` or `yattee://play?url={link}`.
