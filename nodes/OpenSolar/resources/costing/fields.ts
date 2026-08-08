import type { INodeProperties } from 'n8n-workflow';

/**
 * The live schema has ~200 per-system/per-panel/per-watt/per-battery/per-kwh_storage cost
 * columns (supplier_shipping, racking, labor, commission, roof_type_adder_1-5, etc.) —
 * far too many to model individually. These are the handful of clearly-scoped identity
 * fields, plus a JSON catch-all for everything else. Field names use the API's own
 * snake_case so they can be merged straight into the request body without translation —
 * see mergeFieldsCollectionWithJson in shared/transport.ts.
 */
export function buildCostingFieldsCollection(displayOptionsShow: {
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
				displayName: 'Custom Fields (JSON)',
				name: 'customFields',
				type: 'json',
				default: '',
				description:
					'Any of the many per-system/per-panel/per-watt/per-battery/per-kwh_storage cost fields not covered above, as a JSON object, e.g. {"labor_per_watt": 0.05}. Merged into the request alongside the named fields above (those take priority on conflicts).',
			},
			{
				displayName: 'Description',
				name: 'description',
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
				displayName: 'Priority',
				name: 'priority',
				type: 'boolean',
				default: false,
				description: 'Whether this is the priority/default costing applied automatically',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
			},
		],
	};
}
