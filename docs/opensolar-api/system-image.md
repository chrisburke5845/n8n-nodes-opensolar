# System Image

This endpoint might respond with redirects, API consumers are expected to follow the redirects until an image is received.
Calling this endpoint for the first time will generate a Private File which is attached to the Project.
Changing the design of a project, then calling this endpoint will re-generate the Private File.

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET api/orgs/:org_id/projects/:project_id/systems/:uuid/image/" | width and height (required) |

## Example

### Getting system image

Sample GET request and response (Get system image):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/systems/:uuid/image/?width=500&height=500"
  -H "Authorization: Bearer <token>"
```
