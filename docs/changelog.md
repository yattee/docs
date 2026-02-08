---
sidebar_position: 100
title: "Changelog"
---

import Lightbox from '@site/src/components/Lightbox';

<Lightbox />

# Changelog

This page tracks notable changes to the Yattee ecosystem.

## Yattee App

### 2.0.0 (250)

Complete rewrite of Yattee with more robust MPV implementation, redesigned navigation, customizable player controls and gestures, iCloud data and settings sync, video downloads, and multi-source support.

<div class="changelog-hero">
  <a href="/img/screenshots/app/home-light.png" target="_blank"><img src="/img/screenshots/app/home-light.png" alt="Home screen (light mode)" /></a>
  <a href="/img/screenshots/app/home-dark.png" target="_blank"><img src="/img/screenshots/app/home-dark.png" alt="Home screen (dark mode)" /></a>
  <a href="/img/screenshots/app/video-info.png" target="_blank"><img src="/img/screenshots/app/video-info.png" alt="Video info screen" /></a>
  <a href="/img/screenshots/app/player.png" target="_blank"><img src="/img/screenshots/app/player.png" alt="Player screen" /></a>
</div>

:::note iOS Beta Only
Yattee 2.0 is currently available as an iOS beta only. macOS and tvOS builds are not yet available.
:::

:::note Upgrading from 1.x
You can install 2.0 on top of an existing 1.x installation, but all 1.x data (accounts, history, searches) will be lost. Only your configured instances can be reimported on the onboarding screen.
:::

#### Home
- Reorderable sections and shortcuts
- Card and list layout for shortcuts
- Configurable section item limits
- Continue Watching, Feed, Bookmarks, History, Downloads sections

#### Navigation
- Customizable Tab Bar (reorder, hide, startup tab)
- Customizable Sidebar (reorderable main items, sections config, sorting, limits)
- Video Info view with collapsible sections and carousel thumbnail swiping for navigation context
- Swipe actions on video lists (9 configurable actions)
- Search in channels, bookmarks, history, downloads
- Global search with history, recent channels and playlists, and suggestions

#### Media Sources
- Yattee Server (self-hosted yt-dlp backend)
- Invidious (YouTube frontend)
- Piped (YouTube frontend)
- PeerTube (instance discovery and browsing)
- Samba (SMB) (with network auto-discovery)
- WebDAV (with network auto-discovery)
- Optional auth, self-signed/invalid cert support
- Local Folders

#### Player
- MPV playback engine with deep integration into system frameworks
- Native Picture in Picture (PiP)
- AirPlay audio
- Background audio
- Auto-detection of hardware capabilities and best stream selection for device

#### Player Controls
- Control presets with export/import and iCloud sync
- 20+ configurable button types across 3 layout sections (top, center, bottom)
- Glass and plain button styles, adjustable sizes and font sizes
- Volume and brightness sliders
- Player pill with configurable buttons and comments pill mode
- Pinch to zoom and pan (panscan gesture with snap options)
- Storyboard thumbnails on progress bar
- Chapter and sponsored segments markers
- Subtitles/captions with multi-language support and appearance customization
- Quality selector with resolution/codec/bitrate/size info
- Lock orientation
- Lock controls

#### Gestures
- 3-zone tap layout with 9 assignable actions
- Horizontal seek gesture with sensitivity levels
- Panscan pinch gesture with snap options

#### Mini Player
- Plays video while browsing the app
- Configurable video tap action (system PiP or expand)
- Reorderable control buttons via Player Control presets

#### Appearance
- Theme selection (system, light, dark)
- 3 app icons (default, classic, mascot)
- 9 accent colors
- Watched video checkmark badge

#### Library
- Bookmarks with tags, notes, search, multi-source support and iCloud sync
- Playlists with import from YouTube/Invidious/Piped, multi-source support and iCloud sync
- Watch History with configurable retention and iCloud sync
- Continue Watching with cross-device sync
- Search history, with configurable limits
- Recent channels and playlists

#### Downloads
- 5-phase downloads: video, audio, captions, storyboards, thumbnails
- Background downloading
- Batch downloads (playlists, open links)
- Queue management with concurrent download limits
- Automatic quality selection
- Resumable downloads

#### Notifications
- Per-channel new upload notifications
- Background feed refresh (scheduling is managed by iOS, notifications may not be delivered immediately)

#### iCloud Sync
- Syncs: bookmarks, playlists, channels, watch history, search history, recent channels, recent playlists, subscriptions, settings, notification preferences
- Sync conflict resolution with retry logic

#### Open Links
- Batch URL input (up to 20 URLs)
- Parallel extraction via yt-dlp with Yattee Server
- Clipboard URL detection

#### YouTube Enhancements
- SponsorBlock (auto-skip/mute, category filtering, progress bar visualization)
- DeArrow (community titles/thumbnails, vote ranking)
- Return YouTube Dislike

#### Remote Control
- Control other devices running Yattee on the same network
- Play, pause, seek, send videos between devices, view playback status

#### Handoff
- Cross-device handoff for video, channel, playlist, search, playback with playback position

#### Privacy
- Incognito mode
- Configurable watch history retention
- Search history limits

#### Advanced
- Custom MPV options management
- In-app log viewer with filtering and export

Check the [GitHub releases](https://github.com/yattee/yattee/releases) for the latest updates.

## Yattee Server

### 1.0.0

Initial release of Yattee Server -- a self-hosted backend powered by yt-dlp.

- FastAPI + yt-dlp backend supporting YouTube and 1000+ sites
- Stream proxying
- Web-based admin panel with setup wizard
- Per-site credential management (cookies, API keys)
- Multi-user support with permissions
- HTTP Basic Auth + HMAC-signed stream URLs
- Optional Invidious proxy for search suggestions, trending, popular, comments, captions
- Configurable caching TTL (videos, search, channels, avatars)
- Background feed fetcher for subscriptions
- Docker deployment with auto-provisioning

Check the [GitHub releases](https://github.com/yattee/yattee-server/releases) for the latest updates.
