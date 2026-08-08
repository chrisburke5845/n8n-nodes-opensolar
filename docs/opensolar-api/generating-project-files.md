# Generating Project Files

You can generate project documents (e.g. proposal, contract, energy report) via the API. Supported formats include PDF, DOCX, and CSV depending on document type.

## Endpoints

| Endpoint | Description |
| --- | --- |
| POST /api/orgs/:org_id/projects/:project_id/generate_document/:document_type/ | Generate document (recommended) |
| POST /api/orgs/:org_id/projects/:project_id/generate_document_pdf/:document_type/ | Generate PDF (legacy) |
| POST /api/orgs/:org_id/projects/:project_id/generate_document_docx/:document_type/ | Generate DOCX |

## Query parameters

| Parameter | Description |
| --- | --- |
| `file_format` | Output format: `pdf` or `csv`. Optional; default depends on document type. |
| `document_template_id` | The ID of the custom document template to use (optional). Can be found in **Control -> Other -> Document Templates**. |
| `system_uuid` | Which system to use (optional). |
| `payment_option_id` | Which payment option to use (optional). |
| `language` | Language code, e.g. `en` (optional). |
| `file_tags` | Tags to apply to the generated file when saved (optional). |
| `action` | Set to `save` to save the generated file as a private file (optional). |
| `temporary` | Whether the file is temporary (optional). |

## Document types

### PDF document types

| Document Type | Description |
| --- | --- |
| `proposal` | Sales proposal (with contract section) |
| `proposal_only` | Sales proposal only |
| `contract` | Contract document (with proposal) |
| `contract_only` | Contract document only |
| `owners_manual` | Owner's manual |
| `installation_instructions` | Installation instructions |
| `energy_yield_report` | Energy yield report |
| `shade_report` | Shade report |
| `structural_report_mcs` | MCS structural report |
| `pv_site_plan` | PV site plan |
| `system_image_only` | System image |
| `system_performance_image_only` | System performance image |
| `ironridge_bom` | IronRidge bill of materials |
| `global_bom` | Global bill of materials |
| `change_order` | Change order document |
| `generic_document` | Generic document |
| `financials_report` | Financials report |
| `greenlancer_project_summary` | Greenlancer project summary |
| `lightreach_sales_design_details` | Lightreach sales design details |

### CSV document types

| Document Type | Description |
| --- | --- |
| `system_performance_8760` | System performance (8760 hourly) |
| `bill_calculations_csv` | Bill calculations |
| `financials_report` | Financials in CSV format |

> **Note:**
>
> The default format for most document types is PDF. For `system_performance_8760`, `bill_calculations_csv`, and `financials_report`, the default can be CSV. Use `file_format` to request PDF or CSV where both are supported.

## Typical flow

1. **Authenticate** — Obtain an OpenSolar API bearer token (see [Getting Bearer Tokens](getting-bearer-tokens.md)).
2. **Call the endpoint** — `POST` to `generate_document/{document_type}/` with the desired `org_id`, `project_id`, `document_type`, and any required or optional query parameters.
3. **Use the result** — The response may be a URL, file content, or task reference. Some flows save the generated file as a private file (e.g. with `action=save`) and return a private file URL; you can then manage it via the [Private Files](private-files.md) API.

## Examples

### Generate proposal PDF

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/generate_document/proposal/?file_format=pdf&system_uuid=abc-123&payment_option_id=789&language=en"
-H "Authorization: Bearer <token>"
-H "Content-Type: application/json"
--request POST
```

### Generate contract PDF

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/generate_document/contract/?file_format=pdf&system_uuid=abc-123&payment_option_id=789"
-H "Authorization: Bearer <token>"
--request POST
```

### Generate and save as private file

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/generate_document_pdf/proposal/?action=save&system_uuid=abc-123&payment_option_id=789"
-H "Authorization: Bearer <token>"
--request POST
```

When the endpoint is called with `action=save`, the response includes a reference to the created private file. Use `GET /api/orgs/:org_id/private_files/:id/` to retrieve or download it. See [Private Files](private-files.md) for more details.

### Generate DOCX contract

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/generate_document_docx/contract/?system_uuid=abc-123&payment_option_id=789"
-H "Authorization: Bearer <token>"
--request POST
```

### Generate custom document template

> **Note:**
>
> The `document_template_id` can be found in the OpenSolar app under **Control -> Other -> Document Templates**.

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/generate_document/generic_document/?document_template_id=123&language=en_US&system_uuid=1AB6B232-885E-4B44-BB16-DB95E961EA0C&payment_option_id=123"
-H "Authorization: Bearer <token>"
-H "Content-Type: application/json"
--request POST
```
