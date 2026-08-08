import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrivateFileGet = {
	operation: ['get'],
	resource: ['privateFile'],
};

export const privateFileGetDescription: INodeProperties[] = [
	{
		displayName: 'The returned file_contents download URL expires 1 hour after this call',
		name: 'fileContentsExpiryNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForPrivateFileGet,
		},
	},
];
