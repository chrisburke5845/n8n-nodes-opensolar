import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, roleIdField } from '../../shared/descriptions';
import { roleGetManyDescription } from './getAll';

const showOnlyForRoles = {
	resource: ['role'],
};

const showOnlyForRoleGet = {
	resource: ['role'],
	operation: ['get'],
};

export const roleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRoles,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a role',
				description: 'Get the data of a single role',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/roles/{{$parameter.roleId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many roles',
				description: 'List roles in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/roles/',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForRoles,
		},
	},
	{
		...roleIdField,
		displayOptions: {
			show: showOnlyForRoleGet,
		},
	},
	...roleGetManyDescription,
];
