import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookUpdate = {
	operation: ['update'],
	resource: ['webhook'],
};

export const webhookUpdateDescription: INodeProperties[] = [
	{
		displayName:
			'Only fields added below are sent. For Trigger Fields / Payload Fields specifically, OpenSolar treats a blank value as explicitly setting it to null (clearing it) — not as "leave unchanged". Leave those two fields out entirely if you don\'t want to touch them.',
		name: 'webhookUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		default: {},
		options: [
			{
				displayName: 'Debug',
				name: 'debug',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'debug' } },
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				routing: { send: { type: 'body', property: 'enabled' } },
			},
			{
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/webhook',
				routing: { send: { type: 'body', property: 'endpoint' } },
			},
			{
				displayName: 'Headers (JSON)',
				name: 'headers',
				type: 'json',
				default: '',
				description: 'JSON-encoded string of headers to send with each webhook call',
				routing: { send: { type: 'body', property: 'headers' } },
			},
			{
				displayName: 'Payload Fields (JSON Array or Null)',
				name: 'payloadFields',
				type: 'json',
				default: 'null',
				description:
					'Limit the outbound JSON to these field paths, e.g. ["project.*"]. Left as null (the default here), OpenSolar sets payload_fields to null on the webhook.',
				routing: {
					send: {
						type: 'body',
						property: 'payload_fields',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Trigger Fields (JSON Array or Null)',
				name: 'triggerFields',
				type: 'json',
				default: 'null',
				description:
					'Fire the webhook only when one of these field paths changes, e.g. ["project.contract_date"]. Left as null (the default here), OpenSolar sets trigger_fields to null on the webhook.',
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
