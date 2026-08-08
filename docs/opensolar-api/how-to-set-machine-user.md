# How to Set Machine User

Use the bearer token and supply the "is_machine_user" payload to set the user as machine user.

> **Info:**
>
> MFA-enabled users can now be set as machine users. Previously, this was not supported.

Sample PATCH request and response (Set user as a machine user):

> **Note:**
>
> Bearer token should be provided as an Authorization header
>
> The http method user here is PATCH which is stateful
>
> To disable machine user, just change true to false in the machine user payload

**Request**

```
$ curl "https://api.opensolar.com/auth/users/{your_user_id}/"
-H "Content-Type: application/json" -H
"Authorization: Bearer <token>"
--request PATCH
-d '{"is_machine_user":true}'
```

> **Note:**
>
> Once is_machine_user is set to true, token expiration for that account will not apply anymore.

> **Note:**
>
> Please use the user ID and not the role ID in the request URL.

**Response**

```
{
  "url": "https://api.opensolar.com/auth/users/{your_user_id}/",
  "email": "arnie@illbeback.com",
  "is_machine_user>": true
}
```
