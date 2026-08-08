import type { INodeProperties } from 'n8n-workflow';
import { orgIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { permissionRoleCreateDescription } from './create';

const showOnlyForPermissionRoles = {
	resource: ['permissionRole'],
};

export const permissionRoleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPermissionRoles,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a custom permission role',
				description:
					"Create a Custom Permission role for Teams, used to constrain a partner org's access to shared projects. No Get/Update/Delete is documented for this endpoint.",
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/permissions_role/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
		],
		default: 'create',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForPermissionRoles,
		},
	},
	...permissionRoleCreateDescription,
];
