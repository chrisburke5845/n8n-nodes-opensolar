import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProjectShare = {
	operation: ['share'],
	resource: ['project'],
};

export const projectShareDescription: INodeProperties[] = [
	{
		displayName: 'Shared With (JSON)',
		name: 'sharedWith',
		type: 'json',
		default: '[]',
		required: true,
		description:
			'Array of { org_id, permission, is_shared } objects, e.g. [{"org_id": 894, "permission": "https://api.opensolar.com/api/permissions_role/1234/", "is_shared": false}]. permission is optional; is_shared defaults to true.',
		displayOptions: {
			show: showOnlyForProjectShare,
		},
		routing: {
			send: {
				type: 'body',
				property: 'shared_with',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
];
