---
sidebar_position: 2
title: "Local Folders"
---

# Local Folders

Local folder sources let you browse and play video files stored directly on your device. This is the simplest source type -- point Yattee at a directory and its video contents become available in the Media Browser.

## Platform Availability

| Platform | Supported |
|----------|-----------|
| iOS      | Yes       |
| macOS    | Yes       |
| tvOS     | No        |

Local folders are not available on tvOS because the platform does not provide user-accessible filesystem directories.

## Adding a Local Folder

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Local Folder**
4. Choose a directory using the system file picker
5. Give the source a name (optional -- defaults to the folder name)
6. Tap **Save**

### iOS: Files App Integration

On iOS, Yattee uses the system Files app integration to let you pick folders. When you select a folder, Yattee creates a **security-scoped bookmark** -- a persistent reference that allows the app to access that directory across launches without requiring you to re-select it each time.

This means you can point Yattee at folders in:

- The Yattee app container (On My iPhone/iPad)
- iCloud Drive
- Third-party storage providers that appear in the Files app (Dropbox, Google Drive, etc.)

### macOS: Directory Selection

On macOS, the standard directory picker is used. You can select any directory your user account has read access to, including external drives and mounted volumes.

## Browsing and Playing Files

Once a local folder source is added and enabled, its contents appear in the **Sources** list. You can navigate the folder hierarchy, and any recognized video files can be played directly. Yattee uses MPV as its playback engine, which means it supports a vast range of video formats including MP4, MKV, MOV, AVI, WebM, FLV, TS, and many more.

