import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBulkShareUpdate = {
	operation: ['update'],
	resource: ['bulkShare'],
};

const entityTypeOptions = [
	{ name: 'Actions', value: 'actions' },
	{ name: 'Adders', value: 'adders' },
	{ name: 'Battery Schemes', value: 'battery_schemes' },
	{ name: 'Component Battery Activations', value: 'component_battery_activations' },
	{ name: 'Component Inverter Activations', value: 'component_inverter_activations' },
	{ name: 'Component Module Activations', value: 'component_module_activations' },
	{ name: 'Component Other Activations', value: 'component_other_activations' },
	{ name: 'Contracts', value: 'contracts' },
	{ name: 'Costings', value: 'costings' },
	{ name: 'Document Templates', value: 'document_templates' },
	{ name: 'Incentives', value: 'incentives' },
	{ name: 'Payment Options', value: 'payment_options' },
	{ name: 'Pricing Schemes', value: 'pricing_schemes' },
	{ name: 'Project Configurations', value: 'project_configurations' },
	{ name: 'Proposal Templates', value: 'proposal_templates' },
	{ name: 'Testimonials', value: 'testimonials' },
];

export const bulkShareUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		noDataExpression: true,
		options: entityTypeOptions,
		default: 'adders',
		required: true,
		description: 'The kind of entity to share/unshare — sets both the URL and the resource field',
		displayOptions: {
			show: showOnlyForBulkShareUpdate,
		},
		routing: {
			send: { type: 'body', property: 'resource' },
		},
	},
	{
		displayName: 'IDs',
		name: 'ids',
		type: 'json',
		default: '[]',
		required: true,
		description: 'IDs of the entities (of Entity Type) to share/unshare, e.g. [19]',
		displayOptions: {
			show: showOnlyForBulkShareUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'ids',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
	{
		displayName: 'Share With Org IDs',
		name: 'shareWithIds',
		type: 'json',
		default: '[]',
		description: 'Connected org IDs to share the entities with, e.g. [894]',
		displayOptions: {
			show: showOnlyForBulkShareUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'share_with_ids',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
	{
		displayName: 'Unshare With Org IDs',
		name: 'unshareWithIds',
		type: 'json',
		default: '[]',
		description: 'Connected org IDs to unshare the entities from, e.g. [894]',
		displayOptions: {
			show: showOnlyForBulkShareUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'unshare_with_ids',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
];
