---
sidebar_position: 3
title: "Network Shares (SMB & WebDAV)"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Network Shares (SMB & WebDAV)

Network share sources connect Yattee to file servers on your local network, letting you stream video files from a NAS, desktop, or cloud storage service without copying anything to your device.

Yattee supports two network file access protocols:

- **SMB/CIFS** -- the standard Windows/Samba file sharing protocol, widely supported by NAS devices (Synology, QNAP, TrueNAS, etc.) and all major operating systems
- **WebDAV** -- an HTTP-based protocol used by Nextcloud, ownCloud, Apache, and many other services

## Adding an SMB Share

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Samba Share**
4. Fill in the connection details:
   - **Server address** -- the hostname or IP address of the SMB server (e.g., `192.168.1.100` or `nas.local`)
   - **Workgroup** (optional) -- the SMB workgroup name, if your network uses one
   - **Username** and **Password** -- credentials for authentication; leave blank for guest/anonymous access
   - **Protocol version** -- the SMB protocol version to use when connecting to the server
5. Tap **Save**

## Adding a WebDAV Server

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add WebDAV Share**
4. Fill in the connection details:
   - **Server URL** -- the full URL of the WebDAV endpoint (e.g., `https://cloud.example.com/remote.php/dav/files/username/`)
   - **Username** and **Password** (optional) -- credentials if the server requires authentication
   - **SSL settings** -- for HTTPS connections
   - **Allow invalid certificates** -- enable this if your server uses a self-signed SSL certificate
5. Tap **Save**

<ScreenshotPlaceholder description="Network share configuration form" platform="iOS" />

## Network Discovery

Instead of manually entering server details, Yattee can auto-discover SMB and WebDAV services on your local network using Bonjour/mDNS.

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Scan Network**
4. Yattee scans the local network and lists discovered services
5. Tap a discovered service to pre-fill the connection form with its details
6. Review the configuration, add credentials if needed, and tap **Save**

## Browsing and Playing Files

Once a network share is configured and enabled, it appears in the **Sources** view. You can navigate the remote directory hierarchy and play any recognized video file directly over the network.

## iCloud Sync

Network share configurations **sync across all your devices** via iCloud. When you add an SMB share on your iPhone, the same source automatically appears on your Mac, iPad, and Apple TV (as long as they are signed into the same iCloud account).

This means you only need to configure each network share once.

## Password Security

Credentials for network shares are stored securely in the **iOS/macOS Keychain**. When **iCloud Keychain** is enabled, passwords sync alongside the source configurations so you do not need to re-enter them on each device.

## Self-Signed Certificates

If your WebDAV server uses a self-signed SSL certificate, enable the **Allow invalid certificates** option in the source configuration. Without this, the connection will fail because the system will reject the untrusted certificate. This setting applies only to the specific source where it is enabled.
