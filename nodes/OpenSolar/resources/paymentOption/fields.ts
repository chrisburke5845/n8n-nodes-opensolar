import type { INodeProperties } from 'n8n-workflow';

/**
 * Field names use the API's own snake_case so they can be merged straight into the request
 * body without translation — see mergeFieldsCollectionWithJson in shared/transport.ts. The
 * two JSON-array fields (auto_apply_only_specified_states/zips) are parsed from their typed
 * string value separately, after the merge — see parsePaymentOptionJsonArrayFields in index.ts.
 */
export function buildPaymentOptionFieldsCollection(displayOptionsShow: {
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
				name: 'auto_apply_enabled',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Auto Apply Only Specified States (JSON Array)',
				name: 'auto_apply_only_specified_states',
				type: 'json',
				default: '',
				description:
					'Restrict auto-apply to these states, e.g. ["NSW", "VIC"]. Not shown in a concrete example in the docs — format inferred from the field name, worth confirming against a live save.',
			},
			{
				displayName: 'Auto Apply Only Specified Zips (JSON Array)',
				name: 'auto_apply_only_specified_zips',
				type: 'json',
				default: '',
				description:
					'Restrict auto-apply to these zip/postal codes, e.g. ["2000", "3000"]. Not shown in a concrete example in the docs — format inferred from the field name, worth confirming against a live save.',
			},
			{
				displayName: 'Auto Discount',
				name: 'auto_discount',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Configuration (JSON)',
				name: 'configuration_json',
				type: 'json',
				default: '',
				description:
					'Payment-type-specific configuration, e.g. {"collect_signature": true, "final_term": 24}. Sent exactly as typed (as a string), matching how OpenSolar stores it.',
			},
			{
				displayName: 'Contract Template',
				name: 'contract_template',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Custom Fields (JSON)',
				name: 'customFields',
				type: 'json',
				default: '',
				description:
					'Any payment option field not covered above, as a JSON object, e.g. {"utility_tariff_override": ...}. Merged into the request alongside the named fields above (those take priority on conflicts).',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Integration External Reference',
				name: 'integration_external_reference',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Is Archived',
				name: 'is_archived',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Payment Type',
				name: 'payment_type',
				type: 'options',
				default: 'cash',
				options: [
					{ name: 'Cash', value: 'cash' },
					{ name: 'Lease', value: 'lease' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'Loan (Advanced)', value: 'loan_advanced' },
					{ name: 'PPA', value: 'ppa' },
					{ name: 'Regular Payment', value: 'regular_payment' },
				],
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Use Highest Standard System Price',
				name: 'use_highest_standard_system_price',
				type: 'boolean',
				default: false,
			},
		],
	};
}
