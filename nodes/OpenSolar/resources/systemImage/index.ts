import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, projectIdField, systemUuidField } from '../../shared/descriptions';
import { systemImageGetDescription } from './get';

const showOnlyForSystemImage = {
	resource: ['systemImage'],
};

export const systemImageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSystemImage,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a system image',
				description: 'Get a rendered image of a system',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/systems/{{$parameter.systemUuid}}/image/',
						encoding: 'arraybuffer',
						headers: {
							Accept: '*/*',
						},
					},
					output: {
						postReceive: [
							{
								type: 'binaryData',
								properties: {
									destinationProperty: '={{$parameter.binaryPropertyName}}',
								},
							},
						],
					},
				},
			},
		],
		default: 'get',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForSystemImage,
		},
	},
	{
		...projectIdField,
		displayOptions: {
			show: showOnlyForSystemImage,
		},
	},
	{
		...systemUuidField,
		displayOptions: {
			show: showOnlyForSystemImage,
		},
	},
	...systemImageGetDescription,
];
