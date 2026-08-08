import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForPricingSchemeGetAll = {
	operation: ['getAll'],
	resource: ['pricingScheme'],
};

export const pricingSchemeGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForPricingSchemeGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForPricingSchemeGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Auto Apply Enabled',
				name: 'autoApplyEnabled',
				type: 'boolean',
				default: false,
				routing: { request: { qs: { auto_apply_enabled: '={{$value}}' } } },
			},
			{
				displayName: 'Pricing Formula',
				name: 'pricingFormula',
				type: 'string',
				default: '',
				description:
					'Known values seen in the docs: "Markup Percentage", "Price Per Watt", "Price Per Watt By Size", "Fixed Price"',
				routing: { request: { qs: { pricing_formula: '={{$value}}' } } },
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
				routing: { request: { qs: { priority: '={{$value}}' } } },
			},
		],
	},
];
