# Disabling a connection

Disabling a connection will temporarily disable all sharing between two orgs (in both directions).

To enable, you can use the same request but with `is_active` to True.

## Example

```
curl --location --request PATCH 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/:connection_id/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "is_active": false
}'
```
