import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, workflowIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { workflowGetManyDescription } from './getAll';
import { workflowCreateDescription } from './create';
import { workflowUpdateDescription } from './update';

const showOnlyForWorkflows = {
	resource: ['workflow'],
};

const showOnlyForWorkflowsWithId = {
	resource: ['workflow'],
	operation: ['get', 'update', 'delete'],
};

export const workflowDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkflows,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a workflow',
				description: 'Create a new workflow',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/workflows/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a workflow',
				description: 'Delete a workflow',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/workflows/{{$parameter.workflowId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a workflow',
				description: 'Get the data of a single workflow',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/workflows/{{$parameter.workflowId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many workflows',
				description: 'List workflows in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/workflows/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a workflow',
				description: 'Replace a workflow (PUT) — a whole-entity update, see notice below',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/workflows/{{$parameter.workflowId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForWorkflows,
		},
	},
	{
		...workflowIdField,
		displayOptions: {
			show: showOnlyForWorkflowsWithId,
		},
	},
	...workflowGetManyDescription,
	...workflowCreateDescription,
	...workflowUpdateDescription,
];
