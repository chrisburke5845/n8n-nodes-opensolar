# Deleting a connection

Deleting a connection will disable all sharing, and removing all sharing settings between both orgs.

## Example

```
curl --location --request DELETE 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/:connection_id/' \
--header 'Authorization: Bearer REDACTED' \
```
