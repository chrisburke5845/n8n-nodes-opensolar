# Connected Org Record Schema

- `id` (read only) - ID of the org connection record
- `url` (read only) - URL of the org connection record
- `org` (read only) - URL of this org
- `org_to` (read only) - URL of the partner org
- `org_name` (read only) - Name of the partner org
- `permission` (nullable) - URL of the Custom Permissions used by default when sharing a project to this org.
- `notify_roles` - List of role IDs in this org who will be notified whenever a project is shared by the partner org to this org.
- `is_active` - Whether this connection enabled by this org
- `is_other_active` - Whether this connection has been accepted by the partner
- `is_other_enabled` - Whether this connection is active on the partner's side

## Example

```
{
  "id": 123,
  "url": "https://api.opensolar.com/api/orgs/:org_id/connected_orgs/123/",
  "org": "https://api.opensolar.com/api/orgs/:org_id/",
  "org_to": "https://api.opensolar.com/api/orgs/:partner_org_id/",
  "org_name": "TrulySolar",
  "permission": "https://api.opensolar.com/api/permissions_role/1234/",
  "notify_roles": [2343],
  "is_active": true,
  "is_other_active": false,
  "is_other_enabled": false
}
```
