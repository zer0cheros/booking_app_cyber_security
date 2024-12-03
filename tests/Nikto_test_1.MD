# Nikto Scan Report

## Command
```bash
└─$ nikto -url http://192.168.2.122:5000/api/register
```

## Version
**Nikto v2.5.0**

---

## Scan Details

- **Target IP:** 192.168.2.122
- **Target Hostname:** 192.168.2.122
- **Target Port:** 5000
- **Start Time:** 2024-11-21 03:31:10 (GMT-5)

---

## Findings

1. **Access-Control-Allow-Origin Header**
   - **Path:** `/api/register/`
   - **Detail:** Retrieved `Access-Control-Allow-Origin` header: `http://localhost:5173`.

2. **Missing X-Frame-Options Header**
   - **Path:** `/api/register/`
   - **Detail:** The anti-clickjacking `X-Frame-Options` header is not present.
   - **Reference:** [MDN Documentation on X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

3. **Missing X-Content-Type-Options Header**
   - **Path:** `/api/register/`
   - **Detail:** The `X-Content-Type-Options` header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type.
   - **Reference:** [Netsparker on Missing Content-Type Header](https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/)

4. **Sensitive File Found**
   - **Path:** `/api/register/#wp-config.php#`
   - **Detail:** `#wp-config.php#` file found. This file contains the credentials.

---

## Summary

- **Requests:** 8102
- **Errors:** 0
- **Items Reported:** 4
- **End Time:** 2024-11-21 03:31:51 (GMT-5)
- **Duration:** 41 seconds

---

## Host Tested

- **Number of Hosts:** 1
