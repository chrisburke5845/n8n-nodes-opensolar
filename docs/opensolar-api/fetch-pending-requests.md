# Fetch pending requests

Fetching pending requests is done through the connected_orgs/pending/ endpoint.

## Example

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/connected_orgs/pending/' \
--header 'Authorization: Bearer REDACTED'

response
[
    {
        "item_id": 81,
        "org_from_id": 1,
        "org_from_name": "TrulySolar",
        "org_to_id": 2
    }
]
```
