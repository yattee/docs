---
sidebar_position: 100
title: "Changelog"
---

import Lightbox from '@site/src/components/Lightbox';

<Lightbox />

# Changelog

This page tracks notable changes to the Yattee ecosystem.

## Yattee App

### 2.0.0 (261)

#### General

##### New Features
- Add Allow Software-Decoded Formats playback setting
- Add Show Sidebar toggle to Subscriptions view options
- Render clickable links and timestamps in comment text
- Route YouTube links tapped in descriptions through in-app playback
- Resolve URL shorteners and prompt for ambiguous description links
- Rename YouTube Enhancements settings to Integrations and move above Advanced
- Show watch progress bar on thumbnails in playlist, channel, and search views

##### Bug Fixes
- Resume and seek when reopening the currently-loaded video
- Refresh track list when advancing to the next queued video
- Suppress stale player error after switching videos mid-retry
- Surface mpv error details on stream load failure
- Fix local folder playback after app container UUID changes
- Skip local-folder watches from iCloud sync

##### Sources & Backends
- Surface clearer error when adding a Piped frontend URL
- Send Piped session token in the Authorization header again
- Block HTTP Basic Auth proxy for Piped sources
- Cache and prewarm Invidious proxy auto-detection
- Route Yattee Server playback through `/proxy/relay` when "Proxy Videos" is on

##### Improvements
- Prefetch fresh video thumbnail before swapping it into the info view
- Stabilize thumbnail cache across rotating URL tokens to avoid reloads
- Tweak Subscriptions view options sheet layout

#### iOS
- Add channels sidebar to Subscriptions on iPad
- Round player seek bar and show the scrubber only while dragging
- Add interactive swipe-to-dismiss for toasts

#### tvOS

##### New Features
- Add press-and-hold continuous seek on the d-pad
- Expose Background Playback toggle (default off)
- Add Show Sidebar toggle to the Subscriptions view
- Add display frame rate and dynamic range matching
- Show cached channel header while the channel loads
- Live-seek the scrubber and auto-commit on idle; pause playback on entering scrub mode
- Keep player controls visible on pause via an on-screen button
- Show playback failure overlay; dismiss player panels when playback fails

##### Bug Fixes
- Fix MPV startup playback stability
- Fix MPV Options focus and Add/Edit sheet layout
- Fix pickers
- Fix soft-lock in import views when no rows are focusable
- Unstick focus dead-ends in channel views
- Make detail dismiss button opt-in and unstick more views
- Dismiss sidebar detail pages when sidebar selection changes
- Suppress Now Playing while an AirPlay/HomePod route is active
- Hide feed channel filter strip
- Enforce minimum 2 grid columns
- Prevent focus shadow from clipping between Home sections

##### Improvements
- Convert settings and queue to half-screen panels; constrain details panel to the right half
- Make the watched checkmark more prominent on thumbnails
- Use light glass background for player control buttons; black icons on focused buttons for legibility
- Match play button background to prev/next transport buttons
- Remove the close button from the MPV debug stats overlay
- Present instance login as a full-screen cover

---

### 2.0.0 (259)
<div class="changelog-hero">
  <a href="/img/screenshots/app/tvos-sidebar.png" target="_blank"><img src="/img/screenshots/app/tvos-sidebar.png" alt="tvOS sidebar navigation" /></a>
  <a href="/img/screenshots/app/tvos-browse.png" target="_blank"><img src="/img/screenshots/app/tvos-browse.png" alt="tvOS browse view" /></a>
  <a href="/img/screenshots/app/tvos-player.png" target="_blank"><img src="/img/screenshots/app/tvos-player.png" alt="tvOS player" /></a>
  <a href="/img/screenshots/app/tvos-settings.png" target="_blank"><img src="/img/screenshots/app/tvos-settings.png" alt="tvOS settings" /></a>
</div>

**tvOS support** — Yattee 2 is now available on Apple TV via TestFlight, bringing many new features with a native interface built for the large-screen layout
  - Redesigned player controls with a seek bar and storyboard support
  - Sidebar navigation
  - Two-column layouts for Video Info, Channel, Playlist detail, Subscriptions, and setting screens
  - Top Shelf extension

#### New Features
- Add List/Grid layout option for Home sections
- Add Playlists entry to sidebar main navigation
- Add Continue Watching toggles to tab bar and sidebar settings
- Replace onboarding flow with silent v1 import and iCloud alert

#### Improvements
- Store higher-quality YouTube thumbnail URLs in recent playlists
- Refresh expired thumbnail URLs for downloads and video info
- Show video title placeholder while thumbnails load
- Respect video tap action settings in the media browser

#### Bug Fixes
- Fix storyboard downloads with Yattee Server direct YouTube URLs

---

### 2.0.0 (256)

#### New Features
- Show seek time preview when no storyboards are available
- Add separate glass capsule for chapter title above seek preview

#### Improvements
- Deduplicate time formatting and clean up unused code
- Update packages

#### Bug Fixes
- Fix 5 TestFlight crash types from builds 250-254
- Fix HTTP basic auth credentials being stripped from instance URLs
- Fix Home view showing zero counts after returning from background
- Fix HomeView data staleness on new watch entries, tab switches, and settings dismissal
- Fix missing leading padding on instance content section headers

---

### 2.0.0 (254)

#### New Features
- Add video proxy support for Invidious/Piped instances

#### Bug Fixes
- Fix CFNetwork SIGABRT crash when creating download tasks on invalidated session
- Fix BGTaskScheduler crash by moving registration to App.init()
- Fix Piped relatedStreams decoding crash on missing fields

---

### 2.0.0 (253)

#### New Features
- Persist media browser view options per source
- Add Enable All / Disable All menu to channel notifications settings
- Add context menu and swipe actions to related videos in Video Info View
- Persist author cache to disk for instant channel info across restarts

#### Improvements
- Change default player layout settings
- Show video thumbnail in mini player during PiP
- Update media browser view options sheet layout
- Move close video button from toolbar into now playing card in Remote Control

#### Bug Fixes
- Fix deleted playlists resurrecting from iCloud after app restart
- Fix feed channel filter avatars showing placeholders instead of images
- Fix Invidious login failing for passwords with special characters
- Fix subscriber count layout shift in Video Info View channel row
- Fix Feed tab flashing Content Unavailable View on initial load
- Fix blurred background gradient not using DeArrow thumbnail
- Fix playlist rows in Channel View not tappable in empty space
- Fix lock screen always showing 10s seek regardless of system controls setting
- Fix player dismiss gesture stuck after panel dismiss with comments expanded
- Fix incomplete playlist loading by paginating through all pages
- Fix pull-to-refresh scroll offset not resetting in Instance Browse View
- Fix panscan zoom pushing controls off screen for portrait videos

---

### 2.0.0 (250)

Complete rewrite of Yattee with more robust MPV implementation, redesigned navigation, customizable player controls and gestures, iCloud data and settings sync, video downloads, and multi-source support.

<div class="changelog-hero">
  <a href="/img/screenshots/app/home-light.png" target="_blank"><img src="/img/screenshots/app/home-light.png" alt="Home screen (light mode)" /></a>
  <a href="/img/screenshots/app/home-dark.png" target="_blank"><img src="/img/screenshots/app/home-dark.png" alt="Home screen (dark mode)" /></a>
  <a href="/img/screenshots/app/video-info.png" target="_blank"><img src="/img/screenshots/app/video-info.png" alt="Video info screen" /></a>
  <a href="/img/screenshots/app/player.png" target="_blank"><img src="/img/screenshots/app/player.png" alt="Player screen" /></a>
</div>

:::note Beta Availability
Yattee 2.0 is available as an iOS and tvOS beta via TestFlight. A macOS build is not yet available.
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

#### Community Enhancements
- SponsorBlock (auto-skip, category filtering, progress bar visualization)
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

### 1.0.2

#### New Features
- **InnerTube as primary YouTube source** — Yattee Server now talks to YouTube's internal InnerTube API directly, reducing reliance on the Invidious proxy for most operations
  - Video metadata, playlists, channel feeds, general search, recommended videos, comments, avatars, and storyboards all served from InnerTube first, with yt-dlp and Invidious as fallbacks
  - Global InnerTube enabled/disabled toggle in settings

#### Bug Fixes
- Update default feed fetch interval from 30 minutes to 360 minutes
- Fix comments: published timestamp and reply loading
- Fix `isDefault` marking locale dubs as original audio tracks

---

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
