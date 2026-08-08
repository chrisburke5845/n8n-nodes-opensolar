# Creating a connection request

A connection can be created through POST `https://api.opensolar.com/api/orgs/:org_id/connected_orgs/`.

- `org_name` - This is used to identify the partner org, it must be an exact match.
- `notify_roles` - Contains Role IDs of users in the current org that should be notified when the connected org has shared a project to this org.
- `is_active` (optional) - It is possible for connected orgs to be in a disabled state, which will block all teams functionality, while retaining the connection.
- `permission` (optional) - It is possible to allocate a default permission role which will be used when projects are shared from the org to the partner.

## Example

The response will be a Connected Org Record (see below).

**Response**

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "is_active": true,
  "org_name": "TrulySolar",
  "permission": null,
  "notify_roles": [
    2380
  ]
}'
```
