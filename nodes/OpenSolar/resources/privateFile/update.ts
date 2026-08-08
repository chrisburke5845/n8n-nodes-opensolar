import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrivateFileUpdate = {
	operation: ['update'],
	resource: ['privateFile'],
};

export const privateFileUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Field',
		},
		displayOptions: {
			show: showOnlyForPrivateFileUpdate,
		},
		default: {},
		options: [
			{
				displayName: 'Show Customer',
				name: 'showCustomer',
				type: 'boolean',
				default: false,
				description: 'Whether the file is visible to the customer',
				routing: { send: { type: 'body', property: 'show_customer' } },
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'title' } },
			},
		],
	},
];
