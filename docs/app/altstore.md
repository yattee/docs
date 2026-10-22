---
sidebar_position: 2
title: "Installing with AltStore"
---

# Installing with AltStore

Yattee publishes an AltStore source, so you can install the iOS/iPadOS build with [AltStore](https://altstore.io) or [SideStore](https://sidestore.io) and get new builds as updates, without downloading IPA files by hand.

**Source URL:**

```
https://dl.yattee.stream/altstore.json
```

The source is updated automatically with every release and lists the same IPA files that are attached to [GitHub Releases](https://github.com/yattee/yattee/releases).

## Adding the Source

### AltStore

1. Open AltStore on your iPhone or iPad.
2. Go to the **Sources** tab (on AltStore Classic: **Browse > Sources**).
3. Tap **+** and paste `https://dl.yattee.stream/altstore.json`
4. Confirm adding the source.

Alternatively, open this link on your device to add the source in one tap: [altstore://source?url=https://dl.yattee.stream/altstore.json](altstore://source?url=https://dl.yattee.stream/altstore.json)

### SideStore

1. Open SideStore and go to the **Sources** tab.
2. Tap **+** and paste `https://dl.yattee.stream/altstore.json`

## Installing and Updating

After the source is added, Yattee appears in the source's app list. Tap **Free** / **Get** to install it. When a new build is published, it shows up in the **Updates** section of AltStore or SideStore.

The source keeps older builds as well, so you can go back to a previous version from the app's version history if a new build causes problems.

## Limitations

- **iOS and iPadOS only** -- the source contains the iOS build. For macOS, use [TestFlight](https://yattee.stream/beta2) or the direct download from [GitHub Releases](https://github.com/yattee/yattee/releases); for tvOS, use [TestFlight](https://yattee.stream/beta2).
- **No iCloud sync** -- sideloaded apps are re-signed with your own certificate, which cannot carry Yattee's iCloud container. iCloud sync of bookmarks, subscriptions, history and settings is therefore unavailable, and **Settings > iCloud** says so. Everything else works normally and your data is stored on the device. iCloud sync requires installing Yattee from TestFlight (or the App Store).
- **Signing expiry** -- with a free Apple Account, sideloaded apps must be refreshed every 7 days. AltStore and SideStore handle this through background refresh; if the app stops launching, open AltStore/SideStore and refresh it.

## Requirements

- iOS / iPadOS 18 or later
- AltStore (Classic or PAL) or SideStore set up on your device
