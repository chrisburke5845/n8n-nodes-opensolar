import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, costingIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { mergeFieldsCollectionWithJson } from '../../shared/transport';
import { costingGetManyDescription } from './getAll';
import { costingCreateDescription } from './create';
import { costingUpdateDescription } from './update';

const showOnlyForCostings = {
	resource: ['costing'],
};

const showOnlyForCostingsWithId = {
	resource: ['costing'],
	operation: ['get', 'update', 'delete'],
};

const mergeCostingBody = mergeFieldsCollectionWithJson('fields', 'customFields');

export const costingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCostings,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a costing',
				description: 'Create a new costing',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/costings/',
						ignoreHttpStatusErrors: true,
					},
					send: {
						preSend: [mergeCostingBody],
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a costing',
				description: 'Delete a costing',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/costings/{{$parameter.costingId}}/',
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
				action: 'Get a costing',
				description: 'Get the data of a single costing',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/costings/{{$parameter.costingId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many costings',
				description: 'List costings in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/costings/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a costing',
				description: 'Partially update a costing (PATCH)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/costings/{{$parameter.costingId}}/',
						ignoreHttpStatusErrors: true,
					},
					send: {
						preSend: [mergeCostingBody],
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
			show: showOnlyForCostings,
		},
	},
	{
		...costingIdField,
		displayOptions: {
			show: showOnlyForCostingsWithId,
		},
	},
	...costingGetManyDescription,
	...costingCreateDescription,
	...costingUpdateDescription,
];
