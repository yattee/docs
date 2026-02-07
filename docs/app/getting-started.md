---
sidebar_position: 1
title: "Getting Started"
---

# Getting Started

This guide walks you through installing Yattee and adding your first video source.

## Installation

Yattee is available through three channels:

<!-- - **App Store** -- stable releases for iOS, macOS, and tvOS -->
- **[TestFlight](https://yattee.stream/beta2)** -- beta builds with early access to new features
- **Sideloading** -- build from source or install the IPA from [GitHub Releases](https://github.com/yattee/yattee/releases)

:::note iOS Beta Only
Yattee 2.0 is currently available as an iOS beta only. macOS and tvOS builds are not yet available.
:::

### System Requirements

| Platform | Minimum Version |
|----------|-----------------|
| iOS      | 18+             |
| macOS    | 15+             |
| tvOS     | 18+             |

## Quick Setup: Add Your First Source

### YouTube Content

To watch YouTube videos, add one of the following backends:

- **[Yattee Server](https://github.com/yattee/yattee-server)** -- a self-hosted backend that supports YouTube and 1000+ additional sites via yt-dlp.
- **[Invidious](https://invidious.io/)** or **[Piped](https://piped.video/)** instance -- open-source YouTube frontends.

### Local Files

To play videos stored locally or on your network:

- **Local folder** -- point Yattee to a directory on your device
- **SMB share** -- connect to a shared folder on your local network
- **WebDAV server** -- stream from any WebDAV-compatible storage

### PeerTube

- **[PeerTube](https://joinpeertube.org/)** -- a federated, decentralized video platform with independently hosted content. Browse instances directly from within the app.

For detailed configuration of each source type, see the [Sources documentation](sources/understanding-sources.md).
