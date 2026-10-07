---
title: "Shortcuts and Siri"
---

# Shortcuts and Siri

The Shortcuts app lists Yattee's actions under **Yattee**. They run the same actions as the [URL scheme](./url-scheme.md), but:

- They never ask for confirmation, because you built the shortcut yourself.
- They return a value you can use in the next step of the shortcut.
- When something goes wrong, the shortcut stops and shows why — the same reasons as the [x-callback-url errors](./x-callback-url.md#x-error).

Links passed to them must be web (`http`/`https`) or `yattee://` links.

## Videos

| Action | Parameters | Returns |
| --- | --- | --- |
| **Play Video** | **Link**; **Start Time** in seconds (optional — leave it empty to use the link's own time) | Video or playlist title |
| **Add Video to Queue** | **Link**; **Position**: Play Next or End of Queue (default) | Video or playlist title |
| **Download Video** | **Link**. Uses your preferred download quality, or shows the quality picker. Not on Apple TV | Video title |
| **Bookmark Video** | **Link**. A playlist link saves the playlist | Video or playlist title |

Play Video, Download Video, Open Section and Search Videos open Yattee when they run. The others work in the background.

## Channels

| Action | Parameters | Returns |
| --- | --- | --- |
| **Subscribe to Channel** | **Channel Link** | Channel name |
| **Unsubscribe from Channel** | **Channel Link** | Channel name |

They use the account you're using in Yattee.

## Player

| Action | Parameters | Returns |
| --- | --- | --- |
| **Control Player** | **Command**: Resume, Pause, Play/Pause (default), Next Video, Previous Video or Close Player | — |
| **Seek** | **Mode**: To, Forward By (default) or Back By; **Seconds** (default 10) | — |
| **Set Playback Speed** | **Speed**: 0.25× to 3×, or Normal | — |
| **Get Now Playing** | — | Title of what's playing, or empty text when nothing is |

## Navigation

| Action | Parameters | Returns |
| --- | --- | --- |
| **Open Section** | **Section**: Home, Subscriptions (default), Bookmarks, History, Playlists, Continue Watching, Downloads or Settings | — |
| **Search Videos** | **Search For** | — |

## Siri

These work without setting anything up:

| Say | Does |
| --- | --- |
| "Pause Yattee", "Resume Yattee", "Play/Pause in Yattee" | Control Player |
| "Skip in Yattee", "Next Video in Yattee", "Previous Video in Yattee" | Control Player |
| "Close Player in Yattee" | Control Player |
| "What's playing in Yattee" | Get Now Playing — Siri says the title |
| "Open Subscriptions in Yattee", "Show my Watch History in Yattee" | Open Section — any section works |
| "Search Yattee", "Search for videos in Yattee" | Search Videos — Siri asks what to search for |

Siri also understands other words for the commands and sections: "Play", "Continue" or "Unpause" for Resume; "Stop" for Pause; "Next", "Skip Video" for Next Video; "Go Back" for Previous Video; "Close" for Close Player; "Feed" for Subscriptions; "Saved Videos" for Bookmarks.

They also appear in Spotlight and in the Shortcuts app under **Yattee** as ready-made shortcuts.

For anything else, make a shortcut with the actions above and run it by saying its name.

## Example: queue a video from the share sheet

1. Create a shortcut and turn on **Show in Share Sheet**, receiving **URLs**.
2. Add **Add Video to Queue** with **Link** set to **Shortcut Input** and **Position** set to Play Next.
3. Share a YouTube link from Safari and pick the shortcut — the video goes after the one playing.
