import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForSystemGetAll = {
	operation: ['getAll'],
	resource: ['system'],
};

export const systemGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForSystemGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForSystemGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'string',
				default: '',
				description: 'Only return systems belonging to this project',
				routing: { request: { qs: { project: '={{$value}}' } } },
			},
		],
	},
];
