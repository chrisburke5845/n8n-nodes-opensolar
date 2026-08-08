import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForWorkflowGetAll = {
	operation: ['getAll'],
	resource: ['workflow'],
};

export const workflowGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForWorkflowGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForWorkflowGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				routing: { request: { qs: { is_archived: '={{$value}}' } } },
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				routing: { request: { qs: { is_default: '={{$value}}' } } },
			},
		],
	},
];
