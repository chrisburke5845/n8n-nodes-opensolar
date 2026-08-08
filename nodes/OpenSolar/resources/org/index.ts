import type { INodeProperties } from 'n8n-workflow';
import { orgIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { orgUpdateDescription } from './update';

const showOnlyForOrgs = {
	resource: ['org'],
};

export const orgDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForOrgs,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get an org',
				description: 'Get the data of an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an org',
				description: 'Update an org',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
		],
		default: 'get',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForOrgs,
		},
	},
	...orgUpdateDescription,
];
