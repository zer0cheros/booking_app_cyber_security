
# Cloud Metadata Potentially Exposed

## Details

- **URL:** `http://192.168.2.122:5173/latest/meta-data/`
- **Risk:** High
- **Confidence:** Low
- **Attack Vector:** `169.254.169.254`

## Description
The Cloud Metadata Attack attempts to abuse a misconfigured NGINX server in order to access the instance metadata maintained by cloud service providers such as AWS, GCP, and Azure. All of these providers provide metadata via an internal unroutable IP address `169.254.169.254`. This can be exposed by incorrectly configured NGINX servers and accessed by using this IP address in the `Host` header field.

## Other Information
Based on the successful response status code, cloud metadata may have been returned in the response. Check the response data to see if any cloud metadata has been returned. The metadata returned can include information that would allow an attacker to completely compromise the system.

## Solution
Do not trust any user data in NGINX configurations. In this case, it is probably the use of the `$host` variable, which is set from the `Host` header and can be controlled by an attacker.

## Reference
- [NGINX Blog - Trust No One](https://www.nginx.com/blog/trust-no-one-perils-of-trusting-user-input/)
