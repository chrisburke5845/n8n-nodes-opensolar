import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, projectIdField } from '../../shared/descriptions';
import { handleProjectWriteResponse } from '../../shared/errors';
import { projectGetManyDescription } from './getAll';
import { projectCreateDescription } from './create';
import { projectUpdateDescription } from './update';
import { projectPatchDescription } from './patch';
import { projectShareDescription } from './share';

const showOnlyForProjects = {
	resource: ['project'],
};

const showOnlyForProjectsWithId = {
	resource: ['project'],
	operation: ['get', 'update', 'patch', 'delete', 'share'],
};

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProjects,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many projects',
				description: 'List projects in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a project',
				description: 'Get the data of a single project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a project',
				description: 'Create a new project',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProjectWriteResponse],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a project',
				description: 'Replace a project (PUT)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProjectWriteResponse],
					},
				},
			},
			{
				name: 'Update (Partial)',
				value: 'patch',
				action: 'Partially update a project',
				description: 'Update specific fields of a project (PATCH)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProjectWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a project',
				description: 'Delete a project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProjectWriteResponse],
					},
				},
			},
			{
				name: 'Share/Unshare',
				value: 'share',
				action: 'Share or unshare a project',
				description: 'Share or unshare a project with a connected org (updates shared_with)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/projects/{{$parameter.projectId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProjectWriteResponse],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForProjects,
		},
	},
	{
		...projectIdField,
		displayOptions: {
			show: showOnlyForProjectsWithId,
		},
	},
	...projectGetManyDescription,
	...projectCreateDescription,
	...projectUpdateDescription,
	...projectPatchDescription,
	...projectShareDescription,
];
