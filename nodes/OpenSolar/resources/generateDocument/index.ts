import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, projectIdField } from '../../shared/descriptions';
import { generateDocumentGenerateDescription } from './generate';

const showOnlyForGenerateDocument = {
	resource: ['generateDocument'],
};

export const generateDocumentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGenerateDocument,
		},
		options: [
			{
				name: 'Generate',
				value: 'generate',
				action: 'Generate a document',
				description:
					'Generate a project document (proposal, contract, report, BOM, etc.) via the recommended endpoint',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/generate_document/{{$parameter.documentType}}/',
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
		default: 'generate',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForGenerateDocument,
		},
	},
	{
		...projectIdField,
		displayOptions: {
			show: showOnlyForGenerateDocument,
		},
	},
	...generateDocumentGenerateDescription,
];
