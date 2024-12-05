# ZAP by Checkmarx Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 0 |
| Low | 1 |
| Informational | 1 |






## Alert Detail



### [ Cookie without SameSite Attribute ](https://www.zaproxy.org/docs/alerts/10054/)



##### Low (Medium)

### Description

A cookie has been set without the SameSite attribute, which means that the cookie can be sent as a result of a 'cross-site' request. The SameSite attribute is an effective counter measure to cross-site request forgery, cross-site script inclusion, and timing attacks.

* URL: http://33.44.56.12:5000
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `set-cookie: session`
  * Other Info: ``
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `set-cookie: session`
  * Other Info: ``
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `set-cookie: session`
  * Other Info: ``

Instances: 3

### Solution

Ensure that the SameSite attribute is set to either 'lax' or ideally 'strict' for all cookies.

### Reference


* [ https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site ](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site)


#### CWE Id: [ 1275 ](https://cwe.mitre.org/data/definitions/1275.html)


#### WASC Id: 13

#### Source ID: 3

### [ Session Management Response Identified ](https://www.zaproxy.org/docs/alerts/10112/)



##### Informational (Medium)

### Description

The given response has been identified as containing a session management token. The 'Other Info' field contains a set of header tokens that can be used in the Header Based Session Management Method. If the request is in a context which has a Session Management Method set to "Auto-Detect" then this rule will change the session management to use the tokens identified.

* URL: http://33.44.56.12:5000
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `KmAj90_n3mz6RjmPOxToJ`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `e3iTwnrNKUf9qyCVrkArf`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `DaRxQJ_jy23832v_zTi5U`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `MpnauzGm2U8_mPWjBQnUC`
  * Other Info: `
cookie:session`

Instances: 4

### Solution

This is an informational alert rather than a vulnerability and so there is nothing to fix.

### Reference


* [ https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id ](https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id)



#### Source ID: 3