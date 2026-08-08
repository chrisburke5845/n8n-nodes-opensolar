import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConnectedOrgUpdate = {
	operation: ['update'],
	resource: ['connectedOrg'],
};

export const connectedOrgUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: true,
		required: true,
		description:
			'Whether the connection is enabled. Disabling blocks all sharing in both directions but keeps the connection.',
		displayOptions: {
			show: showOnlyForConnectedOrgUpdate,
		},
		routing: {
			send: { type: 'body', property: 'is_active' },
		},
	},
];
