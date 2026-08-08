import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrgUpdate = {
	operation: ['update'],
	resource: ['org'],
};

export const orgUpdateDescription: INodeProperties[] = [
	{
		displayName:
			"OpenSolar's docs only document the org's Name field for writes — the org schema has more fields than that, but their names aren't documented, so they aren't exposed here.",
		name: 'orgUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForOrgUpdate,
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForOrgUpdate,
		},
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
		],
	},
];
