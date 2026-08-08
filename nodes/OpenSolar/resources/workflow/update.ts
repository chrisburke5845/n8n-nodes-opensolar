import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWorkflowUpdate = {
	operation: ['update'],
	resource: ['workflow'],
};

export const workflowUpdateDescription: INodeProperties[] = [
	{
		displayName: 'This is a whole-entity PUT. Any workflow_stages/actions you don\'t include here will be removed — resend every stage and action you want to keep, not just the ones you\'re changing. To add a new action to a stage, give it an ID of "newAction-N" (N = the total number of actions already in that stage) and a title.',
		name: 'workflowUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForWorkflowUpdate,
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForWorkflowUpdate,
		},
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_archived' } },
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_default' } },
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'title' } },
			},
			{
				displayName: 'Workflow Stages (JSON)',
				name: 'workflowStages',
				type: 'json',
				default: '',
				description:
					'The full workflow_stages array to save, including every stage/action you want to keep (see notice above). Only sent if you add this field.',
				routing: {
					send: {
						type: 'body',
						property: 'workflow_stages',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
	},
];
