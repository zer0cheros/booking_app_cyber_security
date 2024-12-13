# ZAP by Checkmarx Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 1 |
| Medium | 1 |
| Low | 0 |
| Informational | 2 |






## Alert Detail



### [ Cloud Metadata Potentially Exposed ](https://www.zaproxy.org/docs/alerts/90034/)



##### High (Low)

### Description

The Cloud Metadata Attack attempts to abuse a misconfigured NGINX server in order to access the instance metadata maintained by cloud service providers such as AWS, GCP and Azure.
All of these providers provide metadata via an internal unroutable IP address '169.254.169.254' - this can be exposed by incorrectly configured NGINX servers and accessed by using this IP address in the Host header field.

* URL: http://10.111.3.169:5173/latest/meta-data/
  * Method: `GET`
  * Parameter: ``
  * Attack: `169.254.169.254`
  * Evidence: ``
  * Other Info: `Based on the successful response status code cloud metadata may have been returned in the response. Check the response data to see if any cloud metadata has been returned.
The meta data returned can include information that would allow an attacker to completely compromise the system.`

Instances: 1

### Solution

Do not trust any user data in NGINX configs. In this case it is probably the use of the $host variable which is set from the 'Host' header and can be controlled by an attacker.

### Reference


* [ https://www.nginx.com/blog/trust-no-one-perils-of-trusting-user-input/ ](https://www.nginx.com/blog/trust-no-one-perils-of-trusting-user-input/)



#### Source ID: 1

### [ CSP: Wildcard Directive ](https://www.zaproxy.org/docs/alerts/10055/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: http://10.111.3.169:5173
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
style-src, img-src, connect-src, frame-src, frame-ancestors, font-src, media-src, object-src, manifest-src, form-action

The directive(s): frame-ancestors, form-action are among the directives that do not fallback to default-src, missing/excluding them is the same as allowing anything.`
* URL: http://10.111.3.169:5173/@vite
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/latest
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/latest/meta-data
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/latest/meta-data/
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/robots.txt
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/robots.txt
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
style-src, img-src, connect-src, frame-src, frame-ancestors, font-src, media-src, object-src, manifest-src, form-action

The directive(s): frame-ancestors, form-action are among the directives that do not fallback to default-src, missing/excluding them is the same as allowing anything.`
* URL: http://10.111.3.169:5173/sitemap.xml
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`
* URL: http://10.111.3.169:5173/sitemap.xml
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
style-src, img-src, connect-src, frame-src, frame-ancestors, font-src, media-src, object-src, manifest-src, form-action

The directive(s): frame-ancestors, form-action are among the directives that do not fallback to default-src, missing/excluding them is the same as allowing anything.`
* URL: http://10.111.3.169:5173/src
  * Method: `GET`
  * Parameter: `content-security-policy`
  * Attack: ``
  * Evidence: `script-src 'self';style-src 'self';img-src 'self';connect-src 'self';font-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';`
  * Other Info: `The following directives either allow wildcard sources (or ancestors), are not defined, or are overly broadly defined:
frame-src, media-src, manifest-src`

Instances: 11

### Solution

Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.

### Reference


* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://caniuse.com/#search=content+security+policy ](https://caniuse.com/#search=content+security+policy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)
* [ https://github.com/HtmlUnit/htmlunit-csp ](https://github.com/HtmlUnit/htmlunit-csp)
* [ https://developers.google.com/web/fundamentals/security/csp#policy_applies_to_a_wide_variety_of_resources ](https://developers.google.com/web/fundamentals/security/csp#policy_applies_to_a_wide_variety_of_resources)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Information Disclosure - Suspicious Comments ](https://www.zaproxy.org/docs/alerts/10027/)



##### Informational (Low)

### Description

The response appears to contain suspicious comments which may help an attacker. Note: Matches made within script blocks or files are against the entire content not only comments.

* URL: http://10.111.3.169:5173
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/@vite
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/@vite/client
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `debug`
  * Other Info: `The following pattern was used: \bDEBUG\b and was detected 6 times, the first in the element starting with: "    this.hmrClient.logger.debug(", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/@vite/client
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "          const el = Array.from(", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/@vite/client
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `query`
  * Other Info: `The following pattern was used: \bQUERY\b and was detected 2 times, the first in the element starting with: "    const [acceptedPathWithoutQuery, query] = acceptedPath.split(`?`);", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/latest
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/latest/meta-data
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/latest/meta-data/
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/robots.txt
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/sitemap.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/src
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in the element starting with: "<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshR", see evidence field for the suspicious comment/snippet.`
* URL: http://10.111.3.169:5173/src/main.tsx
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected 4 times, the first in the element starting with: "import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=eb9f0a05"; const jsxDEV ", see evidence field for the suspicious comment/snippet.`

Instances: 12

### Solution

Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.

### Reference



#### CWE Id: [ 200 ](https://cwe.mitre.org/data/definitions/200.html)


#### WASC Id: 13

#### Source ID: 3

### [ Modern Web Application ](https://www.zaproxy.org/docs/alerts/10109/)



##### Informational (Medium)

### Description

The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.

* URL: http://10.111.3.169:5173
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/@vite
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/latest
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/latest/meta-data
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/latest/meta-data/
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/robots.txt
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/sitemap.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`
* URL: http://10.111.3.169:5173/src
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`

Instances: 8

### Solution

This is an informational alert and so no changes are required.

### Reference




#### Source ID: 3