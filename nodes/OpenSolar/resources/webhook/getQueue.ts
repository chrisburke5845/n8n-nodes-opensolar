import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookGetQueue = {
	operation: ['getQueue'],
	resource: ['webhook'],
};

export const webhookGetQueueDescription: INodeProperties[] = [
	{
		displayName: 'Return as CSV',
		name: 'returnAsCsv',
		type: 'boolean',
		default: false,
		description: 'Whether to return the queued webhooks as a CSV file instead of JSON',
		displayOptions: {
			show: showOnlyForWebhookGetQueue,
		},
		routing: {
			send: {
				type: 'query',
				property: 'format',
				value: '={{ $value ? "csv" : undefined }}',
			},
		},
	},
];
