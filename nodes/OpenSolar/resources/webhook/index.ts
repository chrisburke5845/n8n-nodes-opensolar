import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, webhookIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { handleFormattedListResponse } from '../../shared/transport';
import { webhookCreateDescription } from './create';
import { webhookUpdateDescription } from './update';
import { webhookGetQueueDescription } from './getQueue';
import { webhookGetLogsDescription } from './getLogs';

const showOnlyForWebhooks = {
	resource: ['webhook'],
};

const showOnlyForWebhookUpdate = {
	resource: ['webhook'],
	operation: ['update'],
};

export const webhookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWebhooks,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a webhook',
				description: 'Create a new webhook',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/webhooks/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many webhooks',
				description: 'List webhooks configured for an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/webhooks/',
					},
				},
			},
			{
				name: 'Get Many Process Logs',
				value: 'getLogs',
				action: 'Get many webhook process logs',
				description: 'List webhook delivery/process logs for an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/webhook_process_logs/',
					},
					output: {
						postReceive: [handleFormattedListResponse],
					},
				},
			},
			{
				name: 'Get Many Queued',
				value: 'getQueue',
				action: 'Get many queued webhooks',
				description: 'List queued (not yet delivered) webhooks for an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/webhook_queue_models/',
					},
					output: {
						postReceive: [handleFormattedListResponse],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a webhook',
				description: 'Update a webhook',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/webhooks/{{$parameter.webhookId}}/',
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
			show: showOnlyForWebhooks,
		},
	},
	{
		...webhookIdField,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
	},
	...webhookCreateDescription,
	...webhookUpdateDescription,
	...webhookGetQueueDescription,
	...webhookGetLogsDescription,
];
