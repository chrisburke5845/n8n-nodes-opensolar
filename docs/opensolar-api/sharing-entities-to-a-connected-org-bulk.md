# Sharing entities to a connected org (bulk)

While working on a shared project, you can utilize entities such as equipment, pricing schemes, payment options, and more, which are shared by the collaborating organization.

*entity_type* should be the same as *resource* defined in the POST data.

To unshare, simply add the selected Org ID to `unshare_with_ids`.

Possible values for entity_type are as follows:

- pricing_schemes
- costings
- adders
- payment_options
- actions
- component_module_activations
- component_inverter_activations
- component_battery_activations
- component_other_activations
- project_configurations
- battery_schemes
- proposal_templates
- contracts
- testimonials
- incentives
- document_templates

## Example

```
curl --location --request PUT 'https:/api.opensolar.com/api/orgs/:org_id/bulk/:entity_type/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "share_with_ids": [
    894
  ],
  "unshare_with_ids": [],
  "resource": "adders",
  "ids": [
    19
  ]
}'
```

> **Note:**
>
> it is possible to use unshared entities in shared projects, but they will not be
> visible to the partner org. In this case, warnings will be added to the project data,
> and will be shown in the OpenSolar UI.
