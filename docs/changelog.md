---
sidebar_position: 100
title: "Changelog"
---

import Lightbox from '@site/src/components/Lightbox';

<Lightbox />

# Changelog

This page tracks notable changes to the Yattee ecosystem.

## Yattee App

### 2.0.0 (276)

#### General

##### New Features
- Add **Performance Logging** in **Settings → Advanced → Developer**, logging CPU, energy, memory and activity every 5 seconds to help diagnose battery and performance issues (see [Reporting Issues](./guides/reporting-issues.md#gathering-logs))

##### Improvements
- Lower CPU usage while playing and paused, and during audio-only playback
- Raise the Open Link limit from 20 to 200 URLs
- Keep logs from the previous session in exports, so they survive the app being closed
- Don't animate the video info carousel into place when it first opens

#### iOS

##### Improvements
- Stop decoding video and re-rendering hidden player UI during background playback, reducing battery use
- Smoother, lighter mini player title scrolling
- Log background playback diagnostics when logging is enabled

##### Bug Fixes
- Fix player brightness controls on iPhone Duo

#### tvOS

##### Improvements
- Smoother, lighter mini player title scrolling

---

### 2.0.0 (275)
<div class="changelog-hero">
  <a href="/img/screenshots/app/iphone-duo-home.jpg" target="_blank"><img src="/img/screenshots/app/iphone-duo-home.jpg" alt="iPhone Duo exterior display Home view" /></a>
  <a href="/img/screenshots/app/iphone-duo-subscriptions.jpg" target="_blank"><img src="/img/screenshots/app/iphone-duo-subscriptions.jpg" alt="iPhone Duo Subscriptions with sidebar" /></a>
  <a href="/img/screenshots/app/iphone-duo-player.jpg" target="_blank"><img src="/img/screenshots/app/iphone-duo-player.jpg" alt="iPhone Duo player with comments panel" /></a>
  <a href="/img/screenshots/app/iphone-duo-tabletop.jpg" target="_blank"><img src="/img/screenshots/app/iphone-duo-tabletop.jpg" alt="iPhone Duo half-folded player with controls on the lower half" /></a>
</div>

#### General

##### New Features
- **Multiple accounts** — sign in to several Invidious or Piped accounts, including more than one on the same instance (see [Accounts](./app/sources/remote-servers.md#accounts))
  - Switch from Home, the sidebar or the toolbar, rename accounts, set them inactive without signing out, and sync them through iCloud; the switcher shows when an account needs attention and can be hidden outside Settings
  - Subscriptions, feed, playlists and watch history follow the selected account
  - Manage Invidious and Piped account playlists: create, rename, edit the description, delete, and add or remove videos; set privacy on Invidious
  - Save played videos to the selected account's Invidious watch history; the History screen shows that history and can remove videos from it
  - Choose where a subscription or playlist addition goes with **Subscribe On** in the channel menu and an account picker in Add to Playlist, covering local storage and every signed-in account
- **Automation** — control Yattee from other apps, Shortcuts and Siri
  - [Shortcuts and Siri](./app/automation/shortcuts.md) support, including voice commands for player controls and sections
  - [URL scheme](./app/automation/url-scheme.md) actions (play, queue, download, bookmark, subscribe, player controls, open settings) with [x-callback-url](./app/automation/x-callback-url.md) support
  - Yattee 1.x links work again
- **Redesigned player details panel** with pages (Info, Comments, Queue and more), configurable presets, per-page element customization, per-orientation visibility and section ordering
- Open Link handles more YouTube link types including playlists and @handle channels, opens a single link straight into its details and shows several links as mixed results
- Play direct media links without Yattee Server
- Add Hide Shorts toggle in view options
- **Video info actions in the toolbar** — Play, Download, Share, Add to Playlist and Bookmark can move from the button rows to the navigation bar, with a pinned **Primary Action** and the rest in the ⋯ menu (**Settings > Navigation > Video Info**)
  - Toolbar with Download pinned is the new default on iOS and macOS; tap the thumbnail to play the video
- Add Remote Servers and File Sources sections on Home
- Share videos via privacy frontend URLs, with an optional frontend URL for Piped instances
- Add Refresh, accounts and link actions to the instance browse menu
- Add Currently Playing toggle and empty-queue placeholder to the queue page
- Add player notifications (toasts) for actions and errors
- Show build date in About

##### Improvements
- Start Play in shuffle mode at a random video in the playlist
- Configure comments from their row in details panel settings
- Ask Play Now or Play Next when a video is still playing and the queue is empty
- Redesign the video info header with collapsible chapters and related videos sections; hide empty descriptions
- Show video details load failures instead of a blank view
- Let instance subscription imports choose where subscriptions go
- Prefer the active instance for playback
- Re-fetch data from iCloud when the local store was recreated
- VoiceOver reads the title, channel and duration for video rows
- Move basic auth credentials to the Security section when editing an instance
- Use the channel strip when the subscriptions column is too narrow
- Pinch to pan & scan in the tabletop and corner layouts

##### Bug Fixes
- Fix a crash opening Search when a video is in history under several sources
- Fix a crash when syncing watch history for videos with very long IDs
- Fix a crash with SMB media sources when downloading and playing at the same time
- Fix Sync Now dropping unsent history, progress and bookmark changes
- Fix downloads failing until relaunch after toggling cellular downloads
- Fix the subscription feed not updating after subscribing or unsubscribing
- Fix Now Playing reporting playback as audio
- Fix missing comment avatars with newer Invidious versions
- Fix clipped top controls in corner layout fullscreen
- Fix video info thumbnails and cards misaligned after resizing or rotation
- Fix sheets staying open when opening a link from outside the app
- Fix Video Info and Go to Channel from rows inside the player not collapsing the player

#### iOS

##### New Features
- Add **iPhone Duo** support: tabletop layout with the video above the hinge, split layout in book posture, sidebar on the inner screen, exterior display support and Foldable playback settings
- Add **corner player layout** on iPad, now the default for built-in presets
- Add Navigation setting to keep the tab bar on large screens
- Add keyboard shortcuts on iPad to toggle the corner layout panels (⌥⌘I info, ⌥⌘S side column, ⌥⌘P both)

##### Improvements
- Smooth video resizing during animations, such as corner layout panel toggles and rotation
- Volume and mute respond immediately with the AVFoundation audio output, now preferred
- Exclude downloaded media from iCloud backups

##### Bug Fixes
- Fix the app being killed while saving playback progress during suspension
- Fix a crash rendering video after the app went to the background
- Fix video jumping when dismissing the portrait details panel
- Fix portrait panel tabs blocked by the drag handle
- Fix the player dismiss gesture starting from side sliders and the panel resize handle
- Fix landscape panel moving while Notification Center is open
- Fix search field not activating when selecting the Search tab on iOS 27

#### macOS

##### New Features
- Add **corner player layout**, now the default for built-in presets
- Add keyboard shortcuts to toggle the corner layout panels (⌥⌘I info, ⌥⌘S side column, ⌥⌘P both)
- Add Copy Link to the video context menu
- Show every video info action in the toolbar

##### Improvements
- Open links with Command-Enter
- Volume and mute respond immediately with the AVFoundation audio output, now preferred

##### Bug Fixes
- Fix inline player aspect resizing and playback continuing after its window closes
- Fix player window oscillating when resizing across the corner layout threshold
- Fix Picture in Picture sizing and the PiP window staying open after closing the video
- Fix darker edges beside narrow pages like the empty Search

#### tvOS

##### Improvements
- Keep Apple TV awake during audio-only playback
- Darker player with solid focused controls
- Show link confirmations as alerts
- Offer Cancel while slow pages load

##### Bug Fixes
- Fix being locked out of Settings after hiding it from the sidebar
- Fix white text in video info with the light color scheme
- Fix focus lost after removing a Continue Watching entry

---

### 2.0.0 (270)

#### Bug Fixes
- Fix no streams reported from Piped
- Fix description timestamp links seeking to wrong position for out-of-range values
- Fix deep link timestamp parsing accepting infinity as seek position
- Fix audio sample rate label dropping the kHz decimal
- Fix playback rate display dropping meaningful digits
- Fix www.duckduckgo.com misrouting to yt-dlp external video extraction

#### Improvements
- Chunk stateless feed requests to support more than 500 subscriptions

---

### 2.0.0 (269)

#### New Features
- Add embedded audio/subtitle track selection for multi-track files
- Add loading external subtitle files for media-source playback
- Add view options and search to playlists list view
- Show and label WebDAV/SMB video streams in the quality selector

#### Bug Fixes
- Fix timed links resuming at watch position instead of URL timestamp
- Fix autoplay countdown showing in repeat one queue mode
- Fix double-tap fullscreen gesture rotating on portrait videos
- Fix sending extracted videos (Twitch streams) to other devices
- Fix missing thumbnails for videos saved to library
- Make subtitle appearance settings adjustable on tvOS
- Scope subscription counts and import/export to the active account
- Switch MPVKit to Yattee fork with AV1 VideoToolbox session recovery
- Fix startup crash in sideloaded builds without iCloud entitlements
- Allow screen sleep during audio-only playback
- Apply thumbnail fallback everywhere a single URL was rendered
- Stop tracking resume progress for live streams
- Label local-file video quality from mpv track info instead of Unknown
- Keep macOS player fullscreen when queue advances to different-aspect video
- Fix Picture in Picture geometry glitches from invalid window rects

---

### 2.0.0 (268)

#### New Features
- Show missing-credentials indicator for remote server sources

#### Bug Fixes
- Fix black video, freezes, autoplay and clock on Apple TV HD (A8)
- Fix crash in OpenGL layer initialization on macOS 27 beta
- Fix transparent background of iCloud sync overlay on tvOS
- Fix some reported crashes

---

### 2.0.0 (266)

#### Improvements
- Make Enable Logging the master switch over all verbose logging

#### Bug Fixes
- Fix macOS legacy import sheet missing grouped form style
- Fix tvOS legacy import rows acting as a single Remove button
- Fix periodic tvOS playback stutter from render stalls

---

### 2.0.0 (264)
<div class="changelog-hero">
  <a href="/img/screenshots/app/macos-home.jpg" target="_blank"><img src="/img/screenshots/app/macos-home.jpg" alt="macOS Home view (light mode)" /></a>
  <a href="/img/screenshots/app/macos-home-dark.jpg" target="_blank"><img src="/img/screenshots/app/macos-home-dark.jpg" alt="macOS Home view (dark mode)" /></a>
  <a href="/img/screenshots/app/macos-player.jpg" target="_blank"><img src="/img/screenshots/app/macos-player.jpg" alt="macOS player window" /></a>
  <a href="/img/screenshots/app/macos-settings.jpg" target="_blank"><img src="/img/screenshots/app/macos-settings.jpg" alt="macOS appearance settings" /></a>
</div>

**macOS support** — Yattee 2 arrives on the Mac with its first public beta. It brings the full Yattee 2 experience to the desktop with a native interface: a dedicated player window with fullscreen and stay on top option, Picture in Picture, customizable and movable player controls, keyboard shortcuts, and other features present in the iOS app.

The macOS app is available via [TestFlight](https://yattee.stream/beta2), or as a notarized direct download from [GitHub Releases](https://github.com/yattee/yattee/releases) that keeps itself up to date with built-in automatic updates.

#### General

##### New Features
- Add **audio-only music mode**, available in video player settings and player controls button
- Add **custom accent color** setting with system color picker and **separate light and dark mode colors**
- **Redesign Home shortcut cards** with layout, color, and palette options and a live style preview
- Add Edit Shortcuts and Hide options to Home shortcut context menus
- Add pause, resume, and cancel context menu to download rows
- Add manual legacy account import and allow importing account-less legacy instances as sources

##### Improvements
- Rework iCloud sync engine for more reliable syncing; resume sync from saved state instead of re-fetching everything
- Sync watch progress when a video plays to the end and when the app goes to the background
- Fall back to lower-quality thumbnails when higher-resolution variants are unavailable
- Apply the selected theme at the window level so it takes effect everywhere

##### Bug Fixes
- Fix disabling Background Playback having no effect
- Fix downloads never finishing and a crash on download completion
- Fix missing storyboards when advancing to the next queued video
- Fix live videos shown in the mini player bar
- Fix crash when opening the share sheet on iPad
- Fix rare data loss when the app is suspended in the background
- Fix iCloud sync conflicts for recent channels, playlists, and watch progress
- Fix Sources home shortcut counting disabled instances

#### iOS
- Use toolbar search placement on iPad channel view

#### tvOS
- Add A/V sync diagnostics settings page
- Default Channels grid to 5 columns
- Fixes for some reported playback issues

---

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

<div class="changelog-hero changelog-hero-portrait">
  <a href="/img/screenshots/app/home-light.png" target="_blank"><img src="/img/screenshots/app/home-light.png" alt="Home screen (light mode)" /></a>
  <a href="/img/screenshots/app/home-dark.png" target="_blank"><img src="/img/screenshots/app/home-dark.png" alt="Home screen (dark mode)" /></a>
  <a href="/img/screenshots/app/video-info.png" target="_blank"><img src="/img/screenshots/app/video-info.png" alt="Video info screen" /></a>
  <a href="/img/screenshots/app/player.png" target="_blank"><img src="/img/screenshots/app/player.png" alt="Player screen" /></a>
</div>

:::note[Beta Availability]
Yattee 2.0 is available as a beta on iOS, iPadOS, tvOS, and macOS via [TestFlight](https://yattee.stream/beta2), with macOS also available as a direct download from [GitHub Releases](https://github.com/yattee/yattee/releases).
:::

:::note[Upgrading from 1.x]
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

### 1.0.10

#### Bug Fixes
- Mark feed and channel videos as not Shorts, and leave playlist and recommendation videos unmarked instead of wrongly marking them as not Shorts
- Fix missing channel IDs on recommendations when the author isn't linked
- Report comments turned off as not found instead of a generic error

---

### 1.0.9

#### New Features
- Add bundled bgutil PO token provider for full formats on age-restricted videos (see [Network](./server/admin/settings.md#network))
- Detect stale YouTube account cookies and fall back to anonymous access instead of silently degrading to 360p; add **Validate** button and **Cookies expired** badge on the Sites page (see [Cookie Health](./server/admin/credentials.md#cookie-health))

#### Bug Fixes
- Join multi-audio-track formats by xtags in the hybrid merge
- Parse top-level lockupViewModel in sidebar recommendations

---

### 1.0.8

#### New Features
- Add **YouTube IP Family** setting (`YT_IP_FAMILY`) to force IPv4 or IPv6 for YouTube traffic

#### Bug Fixes
- Resolve channel handles to channel IDs for InnerTube browse
- Route `/proxy/relay` YouTube traffic through the egress proxy when one is configured
- Use the configured yt-dlp path and egress proxy for fast downloads

#### Improvements
- Update yt-dlp to 2026.08.19

---

### 1.0.7

#### Improvements
- Update yt-dlp to 2026.07.04

---

### 1.0.6

#### New Features
- Detect YouTube Shorts via InnerTube signals

#### Bug Fixes
- Fix playlist pagination stopping at 100 videos
- Fix InnerTube playlist extraction for new lockupViewModel shape

#### Improvements
- Update yt-dlp to 2026.06.09

---

### 1.0.5

#### Bug Fixes
- Parse channel videos from InnerTube lockups

---

### 1.0.4

#### Bug Fixes
- Fix fetching channels via InnerTube
- Fix handling errors when fetching channels from Invidious

---

### 1.0.3

#### New Features
- Add `/proxy/relay` byte-relay endpoint for playback streams
- Add toggle to proxy Invidious stream URLs via companion (`local=true`)
- Add YT egress proxy runtime-configurable via the admin panel, with an enable/disable toggle that preserves the value
- Add `SSRF_EXTRA_ALLOWED_CIDRS` env var for allow-listing additional LAN ranges
- Prefer Invidious for video lookups and expose `extractionMethod` in responses
- Mark original audio track via xtags in `displayName`

#### Improvements
- Skip Invidious for live YouTube broadcasts; use yt-dlp instead
- Route Invidious local streams (including `adaptiveFormats`) through `/companion/videoplayback`
- Resolve relative Invidious stream URLs against the instance base URL
- Synthesize audio track metadata from xtags when Invidious omits it

---

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

### 1.0.1

#### Improvements
- Update yt-dlp to 2026.03.17

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
