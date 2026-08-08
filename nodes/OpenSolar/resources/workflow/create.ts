import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWorkflowCreate = {
	operation: ['create'],
	resource: ['workflow'],
};

export const workflowCreateDescription: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWorkflowCreate,
		},
		routing: {
			send: { type: 'body', property: 'title' },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForWorkflowCreate,
		},
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_default' } },
			},
		],
	},
];
