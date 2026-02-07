---
sidebar_position: 1
title: "Understanding Sources"
---

# Understanding Sources

In Yattee, a **source** is any connection that provides video content to the app. Sources are the foundation of the Yattee experience -- every video you watch comes from a configured source, whether it is a folder on your device, a server on your local network, or a remote video platform backend.

## Source Categories

Yattee organizes sources into three categories:

### 1. Local Folders

Local folders let you browse and play video files stored directly on your device.

- **iOS** -- select folders through the Files app integration
- **macOS** -- select any directory on your filesystem

Local folders are ideal for playing downloaded videos, personal recordings, or any media files you have on hand. They are not available on tvOS.

### 2. Network Shares

Network shares connect Yattee to file servers on your local network, giving you access to large video libraries stored on a NAS, desktop, or cloud storage appliance.

- **SMB/CIFS** -- the standard Windows/Samba file sharing protocol, supported by most NAS devices
- **WebDAV** -- an HTTP-based file access protocol used by Nextcloud, ownCloud, and many other services

### 3. Remote Servers

Remote servers connect Yattee to video platform backends that stream content from YouTube and other sites through privacy-respecting intermediaries.

- **[Yattee Server](https://github.com/yattee/yattee-server)** -- self-hosted video API server powered by yt-dlp, supporting YouTube and 1000+ other sites
- **[Invidious](https://invidious.io/)** -- open-source YouTube frontend
- **[Piped](https://piped.video/)** -- open-source YouTube frontend
- **[PeerTube](https://joinpeertube.org/)** -- federated, decentralized video platform

## Managing Sources

### Accessing Source Settings

All source management happens in **Settings > Sources**. From there you can add new sources, edit existing ones, or remove sources you no longer need.

### Enabling and Disabling Sources

Each source can be individually enabled or disabled. Disabling a source hides it from the **Sources** list and search without deleting its configuration. This is useful when you want to temporarily stop using a source -- for example, when a server is undergoing maintenance -- without losing your settings.

### Adding a New Source

For a step-by-step walkthrough of adding your first source, see the [Adding Your First Source](../../guides/first-source.md) guide.

### Discovering Sources

You can also use the **Scan Network** button to automatically discover SMB and WebDAV services on your local network, or **Browse PeerTube Instances** to find and add public PeerTube servers.

## iCloud Sync

Yattee uses iCloud to sync source configurations across your Apple devices, with one important distinction:

- **Network shares and remote servers** -- configurations sync across all devices signed into the same iCloud account. A NAS connection you set up on your iPhone will automatically appear on your Mac and Apple TV.
- **Local folders** -- these are device-specific and do not sync, because they reference directories that exist only on that particular device.

:::note tvOS and credentials
tvOS does not sync credentials from iCloud Keychain. Source configurations will still appear on your Apple TV, but passwords and usernames will be blank. When a synced source appears on tvOS, Yattee will prompt you to enter the credentials directly on the Apple TV.
:::

## Password Storage

Credentials for network shares and remote servers are stored securely in the **iOS/macOS Keychain**. When iCloud Keychain is enabled on your devices, passwords sync alongside the source configurations, so you only need to enter credentials once.
