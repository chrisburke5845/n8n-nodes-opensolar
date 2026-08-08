# Listing established connections

See **Lists and Pagination** for standard options/params.

## Example

```
curl 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/?fieldset=list&limit=20&ordering=-id&page=1&range=%5B0%2C19%5D' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
```
