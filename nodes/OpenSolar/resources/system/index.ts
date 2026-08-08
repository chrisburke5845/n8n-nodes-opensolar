import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, systemIdField } from '../../shared/descriptions';
import { systemGetManyDescription } from './getAll';

const showOnlyForSystems = {
	resource: ['system'],
};

const showOnlyForSystemGet = {
	resource: ['system'],
	operation: ['get'],
};

export const systemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSystems,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a system',
				description: 'Get the data of a single system',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/systems/{{$parameter.systemId}}/',
						qs: {
							fieldset: 'list',
						},
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many systems',
				description: 'List systems in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/systems/',
						qs: {
							fieldset: 'list',
						},
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForSystems,
		},
	},
	{
		...systemIdField,
		displayOptions: {
			show: showOnlyForSystemGet,
		},
	},
	...systemGetManyDescription,
];
