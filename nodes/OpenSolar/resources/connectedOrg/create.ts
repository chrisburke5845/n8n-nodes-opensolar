import type { INodeProperties } from 'n8n-workflow';

const showOnlyForConnectedOrgCreate = {
	operation: ['create'],
	resource: ['connectedOrg'],
};

export const connectedOrgCreateDescription: INodeProperties[] = [
	{
		displayName: 'Org Name',
		name: 'orgName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the partner org to connect with — must be an exact match',
		displayOptions: {
			show: showOnlyForConnectedOrgCreate,
		},
		routing: {
			send: { type: 'body', property: 'org_name' },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForConnectedOrgCreate,
		},
		default: {},
		options: [
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: "Whether the connection is enabled on this org's side",
				routing: { send: { type: 'body', property: 'is_active' } },
			},
			{
				displayName: 'Notify Roles (JSON Array)',
				name: 'notifyRoles',
				type: 'json',
				default: '[]',
				description:
					'Role IDs in this org to notify when the connected org shares a project to this org, e.g. [2380]',
				routing: {
					send: {
						type: 'body',
						property: 'notify_roles',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Permission URL',
				name: 'permission',
				type: 'string',
				default: '',
				placeholder: 'https://api.opensolar.com/api/permissions_role/1234/',
				description:
					'Default Custom Permission role applied when projects are shared from this org to the partner',
				routing: { send: { type: 'body', property: 'permission' } },
			},
		],
	},
];
