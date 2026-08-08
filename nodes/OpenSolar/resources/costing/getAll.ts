import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForCostingGetAll = {
	operation: ['getAll'],
	resource: ['costing'],
};

export const costingGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForCostingGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForCostingGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'boolean',
				default: false,
				description: 'Whether to only return the priority/default costing',
				routing: { request: { qs: { priority: '={{$value}}' } } },
			},
		],
	},
];
