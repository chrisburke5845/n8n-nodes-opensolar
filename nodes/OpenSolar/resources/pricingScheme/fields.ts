import type { INodeProperties } from 'n8n-workflow';

export function buildPricingSchemeFieldsCollection(displayOptionsShow: {
	resource: string[];
	operation: string[];
}): INodeProperties {
	return {
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: displayOptionsShow,
		},
		default: {},
		options: [
			{
				displayName: 'Auto Apply Enabled',
				name: 'autoApplyEnabled',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'auto_apply_enabled' } },
			},
			{
				displayName: 'Auto Apply Only Specified States (JSON Array)',
				name: 'autoApplyOnlySpecifiedStates',
				type: 'json',
				default: '',
				description:
					'Restrict auto-apply to these states, e.g. ["NSW", "VIC"]. Not shown in a concrete example in the docs — format inferred from the field name, worth confirming against a live save.',
				routing: {
					send: {
						type: 'body',
						property: 'auto_apply_only_specified_states',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Auto Apply Only Specified Zips (JSON Array)',
				name: 'autoApplyOnlySpecifiedZips',
				type: 'json',
				default: '',
				description:
					'Restrict auto-apply to these zip/postal codes, e.g. ["2000", "3000"]. Not shown in a concrete example in the docs — format inferred from the field name, worth confirming against a live save.',
				routing: {
					send: {
						type: 'body',
						property: 'auto_apply_only_specified_zips',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Configuration (JSON)',
				name: 'configurationJson',
				type: 'json',
				default: '',
				description:
					'Formula-specific configuration, e.g. {"price_per_module": 500, "tax_percentage_included": 10}. Sent exactly as typed (as a string), matching how OpenSolar stores it.',
				routing: { send: { type: 'body', property: 'configuration_json' } },
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_archived' } },
			},
			{
				displayName: 'Pricing Formula',
				name: 'pricingFormula',
				type: 'string',
				default: '',
				description:
					'Known values seen in the docs: "Markup Percentage", "Price Per Watt", "Price Per Watt By Size", "Fixed Price", "Price Per Module/Inverter/Battery" — the docs are inconsistent about the full list, so this is free text rather than a locked dropdown',
				routing: { send: { type: 'body', property: 'pricing_formula' } },
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
				routing: { send: { type: 'body', property: 'priority' } },
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'title' } },
			},
		],
	};
}
