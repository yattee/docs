---
sidebar_position: 6
title: "Reporting Issues"
---

# Reporting Issues

Found a bug or unexpected behavior? Here's how to file an effective report:

- **Yattee app issues:** [github.com/yattee/yattee/issues](https://github.com/yattee/yattee/issues)
- **Yattee Server issues:** [github.com/yattee/yattee-server/issues](https://github.com/yattee/yattee-server/issues)

## Before Reporting

- **Search existing issues** — someone may have already reported the same problem.
- **Try the latest version** — the bug may already be fixed.
- **Check the [Troubleshooting](../server/troubleshooting.md) page** — common server problems and their solutions are documented there.

## Reporting Yattee App Issues

### Gathering Logs

The app has a built-in logging system that captures detailed information about what's happening under the hood.

1. Open **Settings → Advanced → Developer**.
2. Enable **Enable Logging**.
3. *(Optional)* Enable **Verbose MPV Logging** or **Verbose Remote Control Logging** if the issue is related to playback or remote control.
4. **Reproduce the issue.**
5. Go back to **Developer Settings → View Logs**.
6. Export logs:
   - **iOS / macOS:** Tap **Export Logs** → use the Share Sheet to save or send the file.
   - **tvOS:** Tap **Export Logs** → scan the QR code or visit the displayed URL from another device.

### What to Include

- Description of the issue and steps to reproduce
- Expected vs. actual behavior
- Screenshots or screen recordings
- Exported log file
- App version and build number
- Device model and OS version (iOS / macOS / tvOS)
- Source type being used (Yattee Server, Invidious, Piped, local files, network shares)

## Reporting Yattee Server Issues

### Gathering Logs

View server logs using Docker:

```bash
# Show all logs
docker logs yattee-server

# Show the last 100 lines
docker logs --tail 100 yattee-server

# Follow logs in real time
docker logs -f yattee-server
```

### Server Info

The `/info` endpoint returns version details and configuration:

```bash
curl http://localhost:8085/info
```

This includes yt-dlp, ffmpeg, and Python versions, enabled sites, and current config. Include this output in your report.

### What to Include

- Description of the issue and steps to reproduce
- Server logs (relevant portion)
- Output of the `/info` endpoint
- Docker setup details (`docker-compose.yml`, relevant `.env` variables — **redact passwords and keys**)
- Browser and OS (if the issue is in the admin panel)
- Whether you're using a reverse proxy, and which one (nginx, Caddy, etc.)

## Tips for Good Bug Reports

- **One issue per report** — don't bundle multiple bugs into a single issue.
- **Use a clear, descriptive title** — "Video won't play from Yattee Server source" is better than "it's broken".
- **Include minimal reproduction steps** — the fewer steps needed to reproduce, the faster it gets fixed.
- **Attach files** rather than pasting very long logs inline.
