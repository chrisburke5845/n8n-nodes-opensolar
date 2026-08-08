import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForWebhookGetLogs = {
	operation: ['getLogs'],
	resource: ['webhook'],
};

export const webhookGetLogsDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForWebhookGetLogs),
	{
		displayName: 'Return as CSV',
		name: 'returnAsCsv',
		type: 'boolean',
		default: false,
		description: 'Whether to return the webhook process logs as a CSV file instead of JSON',
		displayOptions: {
			show: showOnlyForWebhookGetLogs,
		},
		routing: {
			send: {
				type: 'query',
				property: 'format',
				value: '={{ $value ? "csv" : undefined }}',
			},
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		description: 'Only return log entries matching this search term',
		displayOptions: {
			show: showOnlyForWebhookGetLogs,
		},
		routing: {
			send: {
				type: 'query',
				property: 'search',
				value: '={{ $value ? $value : undefined }}',
			},
		},
	},
];
