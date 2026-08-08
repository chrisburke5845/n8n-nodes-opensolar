# Sharing a Project

> **Note:**
>
> Shared projects can be viewed and interacted with by the connected organization based on the specified sharing permissions.

- `is_shared` (optional, default=true) - Controls whether the project is visible to the org being shared with.
- `permission` (optional) - The URL to the permission role used to constrain the partner org's access to this project.

## Example

```
curl --location --request PUT 'https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "shared_with": [
    {
      "org_id": 894,
      "permission": "https://api.opensolar.com/api/orgs/:org_id/permissions_role/:permission_role_id/",
      "is_shared": false,
    }
  ]
}'
```
