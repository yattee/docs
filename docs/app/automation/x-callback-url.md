---
title: "x-callback-url"
---

# x-callback-url

Every [action](./url-scheme.md#actions) also works as [x-callback-url](https://x-callback-url.com), so the calling app learns how it went:

```
yattee://x-callback-url/{action}?{parameters}&x-success={url}&x-error={url}&x-cancel={url}
```

`{action}` is any action from the [URL scheme](./url-scheme.md#actions): `play`, `play-next`, `queue`, `download`, `bookmark`, `subscribe`, `unsubscribe`, or a player control such as `player/pause` or `player/state`. Opening links and screens (`open`, `video`, `subscriptions`…) isn't available as x-callback-url and reports `unsupportedAction`.

x-callback-url works on iPhone, iPad and Mac. Apple TV runs the action but can't open the callbacks.

## x-success

Opened when the action finishes, with these added to its query where they apply:

| Parameter | Sent by | Value |
| --- | --- | --- |
| `videoID` | Video actions, player controls | The video's ID |
| `title` | Video and playlist actions, player controls | The video or playlist title |
| `channel` | Video actions, player controls, subscribe/unsubscribe | The channel name |
| `channelID` | `subscribe`, `unsubscribe` | The channel's ID |
| `playlistID` | Playlist links | The playlist's ID |
| `count` | Playlist links | How many videos the playlist has |
| `status` | `download` | `picking` when the quality picker was shown instead of downloading |
| `playing` | Player controls | `true` or `false`. Only this is sent by `player/state` when nothing is playing |
| `position` | Player controls | Current time in whole seconds |
| `duration` | Player controls | Length in whole seconds |
| `rate` | Player controls | Playback speed, such as `1.0` |

## x-error

Opened with `errorCode` and `errorMessage` when the action fails:

| errorCode | Means |
| --- | --- |
| `noSource` | No source is set up that can load the video |
| `notAVideo` | The link isn't something Yattee can play |
| `notAChannel` | `subscribe`/`unsubscribe` got a link that isn't a channel |
| `loadFailed` | The video, channel or playlist couldn't be loaded, or the playlist is empty |
| `queueDisabled` | The queue is turned off in Settings |
| `nothingPlaying` | A player control was sent with nothing playing |
| `unsupportedRate` | `player/rate` got a speed Yattee doesn't offer |
| `downloadFailed` | The download couldn't start |
| `subscribeFailed` / `unsubscribeFailed` | The account couldn't change the subscription |
| `unsupported` | The action isn't available on this device, such as downloading on Apple TV |
| `unsupportedAction` | Yattee doesn't know the action, or a parameter is missing or invalid |
| `cancelled` | You declined the confirmation and no `x-cancel` was given |

## x-cancel

Opened when you decline a [confirmation](./url-scheme.md#confirmation). Without it, x-error is opened with `errorCode=cancelled`.

## Examples

Get what's playing and pass it to a shortcut:

```
yattee://x-callback-url/player/state?x-success=shortcuts://x-callback-url/run-shortcut?name=Now%20Playing
```

Queue a video and hear back either way:

```
yattee://x-callback-url/queue?url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ&x-success=myapp://queued&x-error=myapp://failed
```

On success Yattee opens `myapp://queued?videoID=dQw4w9WgXcQ&title=…&channel=…`; on failure `myapp://failed?errorCode=…&errorMessage=…`.
