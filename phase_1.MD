# Zap Test 1


### X-Content-Type-Options Header Missing

- **URL**: `http://192.168.2.122:5000`
- **Risk**: 🟡 Low
- **Confidence**: Medium
- **Parameter**: `x-content-type-options`
- **Attack**: 
- **Evidence**: Passive (10021 - X-Content-Type-Options Header Missing)

---

#### Description:
The Anti-MIME-Sniffing header `X-Content-Type-Options` was not set to `nosniff`. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set) rather than performing MIME-sniffing.

---

#### Other Info:
- This issue still applies to error type pages (401, 403, 500, etc.) as these pages are often affected by injection issues, which raises concerns for browsers sniffing pages away from their actual content type.
- At "High" threshold, this scan rule will not alert on client or server error responses.

---

#### Solution:
Ensure that the application/web server sets the Content-Type header appropriately and sets the `X-Content-Type-Options` header to `nosniff` for all web pages. If possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing, or that MIME-sniffing can be directed by the web application/web server to not perform MIME-sniffing.

---

#### Reference:
- [Microsoft Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85))
- [OWASP Security Headers](https://owasp.org/www-community/Security_Headers)

---

#### Alert Tags:
| Key                 | Value                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------|
| CWE-693             | [https://cve.mitre.org/data/definitions/693.html](https://cve.mitre.org/data/definitions/693.html) |
| OWASP_2021_A05      | [https://owasp.org/Top10/A05_2021-Security_Misconfiguration/](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/) |
| OWASP_2017_A06      | [https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html](https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html) |

---



