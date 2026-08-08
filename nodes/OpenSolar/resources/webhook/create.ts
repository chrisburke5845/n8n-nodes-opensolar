import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookCreate = {
	operation: ['create'],
	resource: ['webhook'],
};

export const webhookCreateDescription: INodeProperties[] = [
	{
		displayName: 'Endpoint',
		name: 'endpoint',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com/webhook',
		description: 'URL OpenSolar will call when a subscribed event occurs',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: { type: 'body', property: 'endpoint' },
		},
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
		required: true,
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: { type: 'body', property: 'enabled' },
		},
	},
	{
		displayName: 'Debug',
		name: 'debug',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether debug mode is set. Required by the API, but currently unused.',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: { type: 'body', property: 'debug' },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		default: {},
		options: [
			{
				displayName: 'Headers (JSON)',
				name: 'headers',
				type: 'json',
				default: '',
				description:
					'JSON-encoded string of headers to send with each webhook call, e.g. {"Authorization": "Token xyz"}',
				routing: { send: { type: 'body', property: 'headers' } },
			},
			{
				displayName: 'Payload Fields (JSON Array)',
				name: 'payloadFields',
				type: 'json',
				default: '[]',
				description:
					'Limit the outbound JSON to these field paths, e.g. ["project.*"]. Left blank/default on create, OpenSolar applies its documented default field list — see webhooks.md.',
				routing: {
					send: {
						type: 'body',
						property: 'payload_fields',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Trigger Fields (JSON Array)',
				name: 'triggerFields',
				type: 'json',
				default: '[]',
				description:
					'Fire the webhook only when one of these field paths changes, e.g. ["project.contract_date"]. Left blank/default on create, OpenSolar applies its documented default field list — see webhooks.md.',
				routing: {
					send: {
						type: 'body',
						property: 'trigger_fields',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
	},
];
