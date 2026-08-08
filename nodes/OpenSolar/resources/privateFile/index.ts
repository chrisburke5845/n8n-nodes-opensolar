import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, privateFileIdField } from '../../shared/descriptions';
import { handlePrivateFileWriteResponse } from '../../shared/errors';
import { preparePrivateFileUpload } from '../../shared/transport';
import { privateFileGetManyDescription } from './getAll';
import { privateFileGetDescription } from './get';
import { privateFileCreateDescription } from './create';
import { privateFileUpdateDescription } from './update';

const showOnlyForPrivateFiles = {
	resource: ['privateFile'],
};

const showOnlyForPrivateFilesWithId = {
	resource: ['privateFile'],
	operation: ['get', 'update', 'delete'],
};

export const privateFileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPrivateFiles,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a private file',
				description: 'Upload a new private file. Requires the Pro role in the org.',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/private_files/',
						ignoreHttpStatusErrors: true,
					},
					send: {
						preSend: [preparePrivateFileUpload],
					},
					output: {
						postReceive: [handlePrivateFileWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a private file',
				description: 'Delete a private file',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/private_files/{{$parameter.fileId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handlePrivateFileWriteResponse],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a private file',
				description: 'Get the data of a single private file',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/private_files/{{$parameter.fileId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many private files',
				description: 'List private files in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/private_files/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a private file',
				description: 'Update a private file',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/private_files/{{$parameter.fileId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handlePrivateFileWriteResponse],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForPrivateFiles,
		},
	},
	{
		...privateFileIdField,
		displayOptions: {
			show: showOnlyForPrivateFilesWithId,
		},
	},
	...privateFileGetManyDescription,
	...privateFileGetDescription,
	...privateFileCreateDescription,
	...privateFileUpdateDescription,
];
