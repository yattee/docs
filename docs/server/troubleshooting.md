---
sidebar_position: 4
title: "Troubleshooting"
---

# Troubleshooting

This page covers common issues, diagnostic tools, and debugging strategies for Yattee Server.

## Diagnostic Endpoints

### Health Check

```
GET /health
```

Returns `{"status": "ok"}` when the server is running. This endpoint is **always public** -- it never requires authentication. Use it for Docker health checks, load balancer probes, and uptime monitoring.

```bash
curl http://localhost:8085/health
```

### Server Info

```
GET /info
```

Without authentication, returns minimal information:

```json
{"name": "yattee-server"}
```

With valid credentials, returns full details including yt-dlp version, Python version, server version, configuration values, and enabled sites:

```bash
curl -u admin:password http://localhost:8085/info
```

This is the first place to check when diagnosing extraction or compatibility issues.

## Common Issues

### 1. Cannot Access Admin Panel

**Symptom:** You can log in but see a 403 error or are redirected away from `/admin`.

**Cause:** Only accounts with the admin role can access the admin panel. Regular user accounts can authenticate against the API but cannot access administrative pages.

**Fix:** Ensure you are using an admin account. The first account created during the [setup wizard](./setup/setup-wizard.md) is automatically an admin. Additional admin accounts must be explicitly granted the admin role.

---

### 2. Rate Limiting Lockout (HTTP 429)

**Symptom:** All requests from your IP return `429 Too Many Requests`, even with correct credentials.

**Cause:** Too many failed authentication attempts (default: 5 failures within 60 seconds) triggered the rate limiter for your IP address.

**Fix:** Wait for the `rate_limit_window` period (default: 60 seconds) to expire. The lockout clears automatically. If you need immediate access, restart the server to reset all rate limit counters.

:::tip
If you are frequently hitting rate limits during development, you can adjust the `rate_limit_window` and `rate_limit_max_failures` settings to more lenient values.
:::

---

### 3. Invidious 414 Request-URI Too Large Errors

**Symptom:** Feed fetching fails with HTTP 414 errors from Invidious.

**Cause:** Continuation tokens used for paginating Invidious API responses can grow very long, eventually exceeding URI length limits on the Invidious server.

**Fix:** Enable the `feed_fallback_ytdlp_on_414` setting in the admin panel. When enabled, the server automatically falls back to yt-dlp for feed extraction when a 414 error is encountered.

---

### 4. Lost Encryption Key

**Symptom:** Credentials that were previously working now fail. Server logs show decryption errors.

**Cause:** The file `{DATA_DIR}/.encryption_key` was deleted, corrupted, or the `DATA_DIR` was recreated without restoring the key.

:::danger This is unrecoverable
If the encryption key is lost, **all encrypted credentials are permanently unrecoverable**. There is no way to decrypt them without the original key.
:::

**Fix:** If you have a backup of the `.encryption_key` file, restore it. Otherwise, you must delete all existing credentials and re-enter them from scratch. To prevent this in the future, always include the full `DATA_DIR` in your backup strategy.

---

### 5. Stale Downloads Filling Disk

**Symptom:** Disk usage grows continuously; the server's temp/download directory contains old files.

**Cause:** The automatic cleanup task may not be running, or `proxy_download_max_age` is set too high.

**How cleanup works:** The server runs a background task every **60 seconds** that removes proxy downloads older than `proxy_download_max_age` (default: **24 hours**).

**Fix:** Check if the cleanup task is running by looking for cleanup-related log messages. Verify the `proxy_download_max_age` setting is appropriate for your disk capacity. You can also manually clear old files from the download directory.

---

### 6. Feed Not Updating

**Symptom:** The subscription feed shows stale content or is missing recent videos.

**Cause:** The feed fetcher runs on a configurable interval (default: **30 minutes**). Additionally, channels that have not been requested by any user in **14 days** are automatically cleaned up and will not be fetched.

**Fix:**
- Use the **Refresh All** button in the admin panel to trigger an immediate feed refresh.
- Check that the channels you expect are still in the database (channels are cleaned up after 14 days of inactivity).
- Verify the feed fetcher interval in your configuration if updates seem too infrequent.

---

### 7. Videos Not Playing / Extraction Fails

**Symptom:** Attempting to play a video results in an error or no stream URL is returned.

**Possible causes and fixes:**

1. **Outdated yt-dlp:** Check the yt-dlp version via `GET /info`. Update your Docker image or yt-dlp installation if a newer version is available. Sites frequently change their APIs, and yt-dlp updates often contain critical fixes.

2. **Site not enabled:** Verify the site is configured and enabled in the admin panel. Extraction will fail silently for disabled sites.

3. **Missing credentials:** Some content requires authentication (age-restricted, premium, region-locked). Check if the site has valid credentials configured. See [Credentials & Security](./admin/credentials.md) for setup instructions.

4. **Site-specific outage:** The upstream site itself may be experiencing issues. Check if the same video works in a browser.

---

### 8. CORS Errors in Browser

**Symptom:** Browser console shows `Access-Control-Allow-Origin` errors when making API requests.

**Cause:** The server's CORS policy does not include the origin your web application is running on.

**Fix:** Set the `CORS_ORIGINS` environment variable to include your web application's origin:

```bash
CORS_ORIGINS=https://your-app.example.com
```

:::warning
Never use `CORS_ALLOW_ALL=true` in production. It disables credential support and allows any website to make requests to your server.
:::

---

### 9. Cookies Not Working in Docker

**Symptom:** Credentials of type `cookies_browser` fail with errors about missing browsers.

**Cause:** The `cookies_browser` credential type instructs yt-dlp to extract cookies directly from an installed browser. Docker containers do not have browsers installed.

**Fix:** Use the `cookies_file` credential type instead:

1. Export cookies from your browser on your local machine using a cookie export extension.
2. In the admin panel, add a credential of type **cookies_file**.
3. Paste the exported cookie contents (Netscape format) into the value field.

---

### 10. HTTPS/SSL Issues Behind Reverse Proxy

**Symptom:** Redirect loops, mixed content warnings, or cookies not being sent.

**Cause:** The reverse proxy terminates TLS but does not forward protocol information to Yattee Server, so the server thinks it is running on plain HTTP.

**Fix:**
- Ensure your reverse proxy sets the `X-Forwarded-Proto: https` header.
- Keep `SECURE_COOKIES=true` (the default) so cookies are marked `Secure` for HTTPS connections.
- See the [Reverse Proxy guide](./setup/reverse-proxy.md) for complete configuration examples.

## Logging

Yattee Server uses standard Python logging. Key log prefixes help you identify the source of messages:

| Prefix | Component |
|--------|-----------|
| `[Feed]` | Feed fetcher (subscription updates, channel refresh) |
| `[FastDownload]` | Proxy download manager (stream downloading, cleanup) |
| `[Invidious]` | Invidious API integration (feed fetching, API calls) |

To view logs in Docker:

```bash
docker logs yattee-server
# Or follow logs in real time:
docker logs -f yattee-server
```

## Background Tasks

The server starts several background tasks automatically on startup:

| Task | Interval | Description |
|------|----------|-------------|
| Database migrations | Once at startup | Applies any pending schema migrations |
| Auto-provisioning | Once at startup | Sets up default sites and configuration |
| Download cleanup | Every 60 seconds | Removes proxy downloads older than `proxy_download_max_age` |
| Feed fetcher | Every 30 minutes (default) | Refreshes subscription feeds for active channels |
| Avatar cache cleanup | Every 1 hour | Removes stale cached channel avatars |

If any of these tasks are not running as expected, check the server logs for error messages during startup.

## Diagnostic Checklist

When something is not working, run through these steps in order:

1. **Check if the server is running:**
   ```bash
   curl http://localhost:8085/health
   ```
   If this fails, the server process is not running or not reachable.

2. **Check Docker container logs:**
   ```bash
   docker logs yattee-server --tail 100
   ```
   Look for startup errors, crash traces, or repeated error messages.

3. **Verify server info and versions:**
   ```bash
   curl -u admin:password http://localhost:8085/info
   ```
   Check that yt-dlp is up to date and sites are enabled.

4. **Check yt-dlp version specifically:**
   The `/info` response includes the yt-dlp version. Compare it against the [latest yt-dlp release](https://github.com/yt-dlp/yt-dlp/releases) to see if an update is needed.

5. **Test site credentials:**
   Use the **Test** button in the admin panel for each site with credentials configured.

6. **Check disk space:**
   ```bash
   df -h
   ```
   Ensure the volume mounted to `DATA_DIR` has sufficient free space.

7. **Verify network connectivity from the container:**
   ```bash
   docker exec yattee-server curl -I https://www.youtube.com
   ```
   Confirm the container can reach external sites.

8. **Review environment variables:**
   ```bash
   docker inspect yattee-server | grep -A 50 "Env"
   ```
   Verify all configuration values are set correctly.

:::info Still stuck?
If you have worked through this checklist and the issue persists, gather the server logs, the output of `/info`, and a description of the problem, then open an issue on the Yattee Server repository.
:::
