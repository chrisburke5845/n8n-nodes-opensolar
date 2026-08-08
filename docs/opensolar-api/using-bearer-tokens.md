# How to Use Bearer Token

> **Warning:**
>
> Keep your bearer token secure! Never make a shared bearer token visible in the client side.

OpenSolar uses Bearer tokens in the HTTP Authentication header to allow access to the API.

OpenSolar expects the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer <token>`

To authenticate, use this code:

```
# Pass the header and token with each request
curl "api_endpoint_here"
  -H "Authorization: Bearer <token>"
```
