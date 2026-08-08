import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, projectIdField } from '../../shared/descriptions';
import { validateSystemDetailsParts } from '../../shared/transport';
import { systemDetailsGetDescription } from './get';

const showOnlyForSystemDetails = {
	resource: ['systemDetails'],
};

export const systemDetailsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSystemDetails,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get system details for a project',
				description: 'Get design-related data for every system in a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/systems/details/',
					},
					send: {
						preSend: [validateSystemDetailsParts],
					},
				},
			},
		],
		default: 'get',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForSystemDetails,
		},
	},
	{
		...projectIdField,
		displayOptions: {
			show: showOnlyForSystemDetails,
		},
	},
	...systemDetailsGetDescription,
];
