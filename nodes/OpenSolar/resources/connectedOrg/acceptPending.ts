import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConnectedOrgAcceptPending = {
	operation: ['acceptPending'],
	resource: ['connectedOrg'],
};

export const connectedOrgAcceptPendingDescription: INodeProperties[] = [
	{
		displayName: 'Org To ID',
		name: 'orgToId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 2',
		description: 'The org_to_id value from the matching item returned by List Pending Requests',
		displayOptions: {
			show: showOnlyForConnectedOrgAcceptPending,
		},
		routing: {
			send: { type: 'body', property: 'org_to_id' },
		},
	},
];
