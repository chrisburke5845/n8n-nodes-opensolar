import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPermissionRoleCreate = {
	operation: ['create'],
	resource: ['permissionRole'],
};

export const permissionRoleCreateDescription: INodeProperties[] = [
	{
		displayName: 'Role Type',
		name: 'roleType',
		type: 'hidden',
		default: 1,
		displayOptions: {
			show: showOnlyForPermissionRoleCreate,
		},
		routing: {
			send: { type: 'body', property: 'role_type' },
		},
	},
	{
		displayName: 'Permissions (JSON)',
		name: 'permissions',
		type: 'json',
		default: '{}',
		required: true,
		description:
			'Per-section view/create/edit/delete flags, e.g. {"project":{"project":{"view":1,"create":1,"edit":1,"delete":1}}}. Sent to the API as a JSON-encoded string, per custom-permission-for-teams.md. Permissions can only ever reduce what the partner org can do — a permission must also be granted in the partner\'s own set to be active.',
		displayOptions: {
			show: showOnlyForPermissionRoleCreate,
		},
		routing: {
			send: { type: 'body', property: 'permissions' },
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForPermissionRoleCreate,
		},
		routing: {
			send: { type: 'body', property: 'title' },
		},
	},
];
