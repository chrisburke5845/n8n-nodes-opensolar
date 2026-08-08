import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrivateFileCreate = {
	operation: ['create'],
	resource: ['privateFile'],
};

export const privateFileCreateDescription: INodeProperties[] = [
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the input binary field containing the file to upload',
		displayOptions: {
			show: showOnlyForPrivateFileCreate,
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Title/name to save the file as',
		displayOptions: {
			show: showOnlyForPrivateFileCreate,
		},
	},
];
