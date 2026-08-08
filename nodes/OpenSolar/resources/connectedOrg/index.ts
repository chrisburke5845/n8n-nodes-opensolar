import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, connectedOrgIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { connectedOrgCreateDescription } from './create';
import { connectedOrgGetManyDescription } from './getAll';
import { connectedOrgAcceptPendingDescription } from './acceptPending';
import { connectedOrgUpdateDescription } from './update';

const showOnlyForConnectedOrgs = {
	resource: ['connectedOrg'],
};

const showOnlyForConnectedOrgsWithId = {
	resource: ['connectedOrg'],
	operation: ['update', 'delete'],
};

export const connectedOrgDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForConnectedOrgs,
		},
		options: [
			{
				name: 'Accept Pending Request',
				value: 'acceptPending',
				action: 'Accept a pending connection request',
				description: 'Accept a connection request from another org',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/accept_connection/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Create Connection Request',
				value: 'create',
				action: 'Create a connection request',
				description: 'Request a connection with another org',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Delete Connection',
				value: 'delete',
				action: 'Delete a connection',
				description: 'Remove a connection and all sharing settings between both orgs',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/{{$parameter.connectedOrgId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Enable/Disable Connection',
				value: 'update',
				action: 'Enable or disable a connection',
				description: 'Temporarily enable or disable sharing between both orgs',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/{{$parameter.connectedOrgId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'List connections',
				description: 'List established connections for an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/',
					},
				},
			},
			{
				name: 'List Pending Requests',
				value: 'getPending',
				action: 'List pending connection requests',
				description: 'List connection requests awaiting acceptance from this org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/connected_orgs/pending/',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForConnectedOrgs,
		},
	},
	{
		...connectedOrgIdField,
		displayOptions: {
			show: showOnlyForConnectedOrgsWithId,
		},
	},
	...connectedOrgCreateDescription,
	...connectedOrgGetManyDescription,
	...connectedOrgAcceptPendingDescription,
	...connectedOrgUpdateDescription,
];
