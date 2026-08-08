# Custom permission for Teams

It is possible to constrain what a partner org can do/see with projects shared to them.
To do this, first create a `permissions_role` which defines the project permissions required.
This is the same model used to define roles which are applied to users within an org, but is distinguished using `role_type=1`.

- `role_type` - Should always be present and always set to 1 (0 is for normal Custom Roles).

## Example

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/permissions_role/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REDACTED' \
--data '{
  "role_type": 1,
  "permissions": "{\"project\":{\"project\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"info_contact_info_basic\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"info_contact_info_full\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"info_sales_and_marketing\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"info_system_summary_section_pricing\":{\"view\":1,\"create\":0,\"edit\":0,\"delete\":0},\"info_sale\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"info_installation_info\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"info_transactions\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"info_documents\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"info_sharing\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"energy_usage_tariff\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"design\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_panels_build\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_pricing\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_costing_override\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_commission_override\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_incentives\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"design_payment_options\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"design_price_adders\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"design_cost_breakdown\":{\"view\":1,\"create\":0,\"edit\":0,\"delete\":0},\"design_tax_override\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"proposal\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"manage\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"manage_notes_activities_actions\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"manage_workflow_stages\":{\"view\":1,\"create\":0,\"edit\":1,\"delete\":0},\"manage_assigned_users\":{\"view\":1,\"create\":1,\"edit\":1,\"delete\":1},\"purchases_for_projects\":{\"view\":1,\"create\":1,\"edit\":0,\"delete\":0},\"sld\":{\"view\":0,\"create\":1,\"edit\":0,\"delete\":0}}}",
  "title": "New Permission set"
}'
```

> **Note:**
>
> These permission sets will only ever reduce a user's permissions in a project.
> If the user is prevented by their org from viewing the System Summary (for example)
> there is no way that the partner org can grant them this permission in a project
> hared to them. This is to say that a permission must be granted in both sets to be active.
