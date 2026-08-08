# Getting Bearer Tokens

All OpenSolar API requests require an **OpenSolar API bearer token**. Send it in the request header:

```
Authorization: Bearer <your_token>
```

> **Note:**
>
> Standard user tokens expire after 7 days. To prevent tokens from expiring, set your user to be a `machine user`. MFA-enabled users can also be set as machine users.

## Option A: Email and password

Create a new user login either by registering to create a new free account, or by sending an invitation to join an existing account. For MFA enabled accounts, you'll have to add the current 2FA token in the POSTed data.

> **Info:**
>
> Bearer Tokens cannot be generated using the OpenSolar App. To obtain a bearer token, you must use the API endpoint as shown below.

**Request**

```
curl "https://api.opensolar.com/api-token-auth/"
-H "Content-Type: application/json"
--request POST
-d '{"username":"arnie@illbeback.com","password":"gettothechopper", "token": "1234"}'
```

**Response**

```
{
  "token": "d7e1b00845ae0d9d3fdfc8c0cbf2300766d94002",
  "user": {
    ...
  },
  ...
}
```

## Option B: Nearmap Users (NMOS)

Users who sign in via Nearmap ("Login with Nearmap") receive the **same** OpenSolar API bearer token as regular users. However, the method for obtaining the token is different.

> **Warning:**
>
> Your Nearmap login credentials **will not work** for API authentication. Nearmap users are initially assigned a temporary password that is not accessible. You must reset your OpenSolar password before you can generate a bearer token.

### Setting up API access for Nearmap users

**Step 1 - Generate OpenSolar password**

1. Go to the [Forgot Password](https://app.opensolar.com/#/password-reset) page
2. Enter your current OpenSolar email address to trigger a password reset email

**Step 2 - Login to OpenSolar**

1. Login to OpenSolar using your OpenSolar email address and newly set password
2. (Optional) If you need to change your email, visit: <https://app.opensolar.com/#/email-change-form> and enter the new email address along with the password set in Step 1

**Step 3 - Generate bearer token**

Once you have set your OpenSolar password, you can generate a bearer token using the standard email/password method (see [Option A](#option-a-email-and-password) above).

**Request**

```
curl "https://api.opensolar.com/api-token-auth/"
-H "Content-Type: application/json"
--request POST
-d '{"username":"your-opensolar-email@example.com","password":"your-opensolar-password"}'
```

## Option C: Fetch token (existing session)

If the user is already logged in (via NMOS or email/password), call the fetch token endpoint to get or refresh the OpenSolar bearer token.

**Endpoint:** `GET /api/fetch_token/?org_id=<org_id>`

- `org_id` is optional; when provided, the response is scoped to that org.

**Headers:**

- `Authorization: Bearer <existing_token>` — Your current OpenSolar token (or session cookie).

**Response:** JSON with a new or refreshed token and user/org data. Use the returned token for subsequent API calls.

## Nearmap users (NMOS) summary

- Nearmap login credentials **cannot** be used directly for API authentication.
- Nearmap users must first reset their OpenSolar password via the [Forgot Password](https://app.opensolar.com/#/password-reset) page.
- Once the OpenSolar password is set, use the standard email/password method (`POST /api-token-auth/`) to generate a bearer token.
- The **Nearmap imagery token** is separate and is only used when calling Nearmap tile/imagery APIs; it is not used for OpenSolar API requests.
