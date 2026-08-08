import type { INodeProperties } from 'n8n-workflow';
import { orgIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { bulkShareUpdateDescription } from './update';

const showOnlyForBulkShare = {
	resource: ['bulkShare'],
};

export const bulkShareDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBulkShare,
		},
		options: [
			{
				name: 'Share/Unshare',
				value: 'update',
				action: 'Bulk share or unshare entities',
				description: 'Share or unshare a batch of entities of one type with a connected org',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/bulk/{{$parameter.entityType}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
		],
		default: 'update',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForBulkShare,
		},
	},
	...bulkShareUpdateDescription,
];
