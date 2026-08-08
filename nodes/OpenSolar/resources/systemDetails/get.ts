import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSystemDetailsGet = {
	operation: ['get'],
	resource: ['systemDetails'],
};

export const systemDetailsGetDescription: INodeProperties[] = [
	{
		displayName:
			'Only works for projects owned by this org (not projects shared to you via Teams). Known to time out on projects with a lot of data — use Include Parts / Exclude Parts below to reduce the response size.',
		name: 'systemDetailsNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForSystemDetailsGet,
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: showOnlyForSystemDetailsGet,
		},
		default: {},
		options: [
			{
				displayName: 'Exclude Parts',
				name: 'excludeParts',
				type: 'string',
				default: '',
				description:
					'Retain most fields of the system data while excluding specific ones. Cannot be used together with Include Parts.',
				routing: { request: { qs: { exclude_parts: '={{$value}}' } } },
			},
			{
				displayName: 'Include Parts',
				name: 'includeParts',
				type: 'string',
				default: '',
				description:
					'Cherry-pick specific fields of the system data to return, e.g. "mcs". Cannot be used together with Exclude Parts.',
				routing: { request: { qs: { include_parts: '={{$value}}' } } },
			},
			{
				displayName: 'Limit to Sold',
				name: 'limitToSold',
				type: 'boolean',
				default: false,
				description: 'Whether to fetch only systems that have been sold',
				routing: { request: { qs: { limit_to_sold: '={{$value}}' } } },
			},
		],
	},
];
