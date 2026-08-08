# Accept a pending connection request

*org_to_id* refers to `org_to_id` from the pending connection requests.

## Example

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/accept_connection/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "org_to_id": 2
}'
```
