# ZAP by Checkmarx Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| Informational | 1 |






## Alert Detail



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
  * Evidence: `T-0FJVMX5U-XyluNGHnqI`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `e3iTwnrNKUf9qyCVrkArf`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `gWXO70EVRi50e9hIg28Qg`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/api/login
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `LQgGe27u_553ZpOK0d-J2`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/api/login
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `PDHKJFHPzt1E5koDnmUMK`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/api/register
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `FWkHm0aHdDrAWKBDsBgqt`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/api/register
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `k1fEFhuOJfCqashHSU1b6`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `DaRxQJ_jy23832v_zTi5U`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `QW1NcY86-T9Azxs68kefQ`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `WKOk9TSRrAvn_zMGG89X5`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/robots.txt
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `cyiyu59h5yYP9BniFkN7a`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `0N-hftZfnzsc7p95Ni4Jl`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `2BDFktfhizLKmCEPXmbxr`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `E0vkKXM0q56FZJmQUKVSL`
  * Other Info: `
cookie:session`
* URL: http://33.44.56.12:5000/sitemap.xml
  * Method: `GET`
  * Parameter: `session`
  * Attack: ``
  * Evidence: `MpnauzGm2U8_mPWjBQnUC`
  * Other Info: `
cookie:session`

Instances: 16

### Solution

This is an informational alert rather than a vulnerability and so there is nothing to fix.

### Reference


* [ https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id ](https://www.zaproxy.org/docs/desktop/addons/authentication-helper/session-mgmt-id)



#### Source ID: 3