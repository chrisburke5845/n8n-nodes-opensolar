# Private Files

The Private Files API lets you list, create, retrieve, update, and delete private files for an organisation. Files can be scoped to a project and filtered by project, user, and file tags.

## Endpoints

| Endpoint | Description |
| --- | --- |
| GET /api/orgs/:org_id/private_files/ | List private files |
| GET /api/orgs/:org_id/private_files/:file_id/ | Retrieve a private file |
| POST /api/orgs/:org_id/private_files/ | Create a private file |
| PATCH /api/orgs/:org_id/private_files/:file_id/ | Update a private file |
| DELETE /api/orgs/:org_id/private_files/:file_id/ | Delete a private file |

**Permissions:** Authenticated user must be a Pro for the same org.

**Throttling:** 1000 requests per day per org for both read and write operations.

## Query parameters

| Parameter | Description |
| --- | --- |
| `project` | Filter by project (e.g. project resource URL or id). |
| `user_id` | Filter by user. |
| `file_tags` | Filter by file tag(s). |
| `file_tags_exclude` | Exclude files with these tags. |
| `search` | Search across `title`, `system_uuid`, `input_data`, `input_data_hash`, `file_hash`, `status`, `status_message`. |
| `ordering` | One of: `created_date`, `modified_date`, `title`, `status`, `filesize` (prefix with `-` for descending). Default ordering is `-modified_date`. |

## Access rules

- Users with org-wide **access files** permission can access all org private files (subject to export permission for export-tagged files).
- Users without org-wide file access can only access:
  - Files they created, or
  - Files attached to projects they have access to (based on project permissions).
- Export-tagged files require the `projects_export` permission.

## Response fields

The private file resource includes:

| Field | Description |
| --- | --- |
| `url` | Resource URL |
| `id` | File ID |
| `org` | Organisation resource URL |
| `project` | Project resource URL (if associated) |
| `user` | User resource URL |
| `document_template` | Document template reference (if applicable) |
| `title` | File title/name |
| `file_contents` | URL to download the file (time-limited) |
| `filesize` | File size in bytes |
| `file_tags` | List of file tag URLs |
| `file_tags_data` | Embedded file tag data |
| `system_uuid` | Associated system UUID (if applicable) |
| `input_data` | Input data used to generate the file |
| `input_data_hash` | Hash of the input data |
| `file_hash` | Hash of the file contents |
| `status` | File status (e.g. `created`) |
| `status_message` | Status message |
| `show_customer` | Whether the file is visible to the customer |
| `temporary` | Whether the file is temporary |
| `upload_id` | Multipart upload ID (for chunked uploads) |
| `parts` | Upload parts (for chunked uploads) |
| `completed_on` | Upload completion timestamp (for chunked uploads) |
| `created_date` | Creation timestamp |
| `modified_date` | Last modified timestamp |

> **Note:**
>
> The URL for downloading private files (`file_contents`) is time-delimited and will expire after 1 hour.

## File tags

Files can be tagged with one or more file tags to categorise them. To filter by file tags, use the `file_tags` query parameter with the file tag title (URL encoded).

See [File Tags](file-tags.md) for the complete list of available file tags.

## Examples

### List private files

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/"
-H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/private_files/29733/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "document_template": null,
    "project": "https://api.opensolar.com/api/orgs/1/projects/23389/",
    "user": "https://api.opensolar.com/api/global_users/1/",
    "file_tags": [
      "https://api.opensolar.com/api/file_tags/47/"
    ],
    "file_tags_data": [
      {
        "url": "https://api.opensolar.com/api/file_tags/47/",
        "title": "Site Model",
        "type": "private",
        "id": 47
      }
    ],
    "title": "site_model_23389.geojson",
    "system_uuid": null,
    "file_hash": "7e2d4674f2eb36ed26e1f10ca83b69fa",
    "status": "created",
    "status_message": "",
    "filesize": 4662,
    "file_contents": "https://api.opensolar.com/media/private/site_model_23389.geojson?Expires=...",
    "show_customer": false,
    "created_date": "2026-02-11T01:50:41.756421Z",
    "modified_date": "2026-02-11T01:50:43.125647Z",
    "temporary": false,
    "id": 29733
  },
  ...
]
```

### List private files by project

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/?project=:project_id"
-H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/private_files/29741/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "document_template": null,
    "project": "https://api.opensolar.com/api/orgs/1/projects/24325/",
    "user": "https://api.opensolar.com/api/global_users/1/",
    "file_tags": [],
    "file_tags_data": [],
    "title": "SCR-20260206-java.png",
    "system_uuid": null,
    "file_hash": null,
    "status": "created",
    "status_message": null,
    "filesize": null,
    "file_contents": "https://api.opensolar.com/media/private/SCR-20260206-java.png?Expires=...",
    "show_customer": false,
    "created_date": "2026-02-12T07:05:27.899762Z",
    "modified_date": "2026-02-12T07:05:29.102446Z",
    "temporary": false,
    "id": 29741
  }
]
```

### List private files by file tag

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/?file_tags=Extra%20File"
-H "Authorization: Bearer <token>"
```

> **Info:**
>
> The `file_tags` value must be URL encoded. For example, if the file tag title is "Extra File", it should be encoded as `Extra%20File` in the URL.

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/private_files/14748/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "document_template": null,
    "project": "https://api.opensolar.com/api/orgs/1/projects/19301/",
    "user": "https://api.opensolar.com/api/global_users/1/",
    "file_tags": [
      "https://api.opensolar.com/api/file_tags/38/"
    ],
    "file_tags_data": [
      {
        "url": "https://api.opensolar.com/api/file_tags/38/",
        "title": "Extra File",
        "type": "private",
        "id": 38
      }
    ],
    "title": "Wimada Shop Logo.png",
    "system_uuid": null,
    "file_hash": null,
    "status": null,
    "status_message": null,
    "filesize": 0,
    "file_contents": "https://api.opensolar.com/media/private/Wimada_Shop_Logo.png?Expires=...",
    "show_customer": false,
    "created_date": "2024-07-08T10:28:46.891244Z",
    "modified_date": "2024-07-08T10:28:46.891291Z",
    "temporary": false,
    "id": 14748
  },
  ...
]
```

### Retrieve a private file

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/:file_id/"
-H "Authorization: Bearer <token>"
```

**Response**

```
{
  "url": "https://api.opensolar.com/api/orgs/1/private_files/29733/",
  "org": "https://api.opensolar.com/api/orgs/1/",
  "document_template": null,
  "project": "https://api.opensolar.com/api/orgs/1/projects/23389/",
  "user": "https://api.opensolar.com/api/global_users/1/",
  "file_tags": [
    "https://api.opensolar.com/api/file_tags/47/"
  ],
  "file_tags_data": [
    {
      "url": "https://api.opensolar.com/api/file_tags/47/",
      "title": "Site Model",
      "type": "private",
      "id": 47
    }
  ],
  "title": "site_model_23389.geojson",
  "system_uuid": null,
  "file_hash": "7e2d4674f2eb36ed26e1f10ca83b69fa",
  "status": "created",
  "status_message": "",
  "filesize": 4662,
  "file_contents": "https://api.opensolar.com/media/private/site_model_23389.geojson?Expires=...",
  "show_customer": false,
  "created_date": "2026-02-11T01:50:41.756421Z",
  "modified_date": "2026-02-11T01:50:43.125647Z",
  "temporary": false,
  "id": 29733
}
```

### Create a private file

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/"
-H "Authorization: Bearer <token>"
-H "Content-Type: multipart/form-data"
-X POST
-F "title=My Document"
-F "file_contents=@/path/to/file.pdf"
```

**Response**

```
{
  "url": "https://api.opensolar.com/api/orgs/1/private_files/29738/",
  "org": "https://api.opensolar.com/api/orgs/1/",
  "document_template": null,
  "project": null,
  "user": "https://api.opensolar.com/api/global_users/1/",
  "file_tags": [],
  "file_tags_data": [],
  "title": "My Document",
  "system_uuid": null,
  "file_hash": null,
  "status": null,
  "status_message": null,
  "filesize": 5193,
  "file_contents": "https://api.opensolar.com/media/private/my_document.pdf?Expires=...",
  "show_customer": false,
  "created_date": "2026-02-12T06:36:07.725425Z",
  "modified_date": "2026-02-12T06:36:07.734570Z",
  "temporary": false,
  "id": 29738
}
```

### Update a private file

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/:file_id/"
-H "Authorization: Bearer <token>"
-H "Content-Type: application/json"
-X PATCH
-d '{"title": "new title"}'
```

**Response**

```
{
  "url": "https://api.opensolar.com/api/orgs/1/private_files/28864/",
  "org": "https://api.opensolar.com/api/orgs/1/",
  "document_template": null,
  "project": "https://api.opensolar.com/api/orgs/1/projects/24122/",
  "user": "https://api.opensolar.com/api/global_users/1/",
  "file_tags": [
    "https://api.opensolar.com/api/file_tags/53/"
  ],
  "file_tags_data": [
    {
      "url": "https://api.opensolar.com/api/file_tags/53/",
      "title": "Design Backup",
      "type": "private",
      "id": 53
    }
  ],
  "title": "new title",
  "system_uuid": null,
  "file_hash": "43e9c1be08aa676ed1352292aa4f20f3",
  "status": "created",
  "status_message": "",
  "filesize": 161664,
  "file_contents": "https://api.opensolar.com/media/private/Design_Backup_-_User1_Time2026-01-13_040532?Expires=...",
  "show_customer": false,
  "created_date": "2026-01-13T04:05:32.104191Z",
  "modified_date": "2026-02-12T06:50:33.182743Z",
  "temporary": false,
  "id": 28864
}
```

### Delete a private file

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/private_files/:file_id/"
-H "Authorization: Bearer <token>"
-X DELETE
```

## Related

- [Projects](projects.md) — Access private files via the project response (`private_files` and `private_files_data` fields)
- [Generating Project Files](generating-project-files.md) — Generate documents that can be saved as private files
