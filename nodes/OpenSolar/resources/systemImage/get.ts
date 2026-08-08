import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSystemImageGet = {
	operation: ['get'],
	resource: ['systemImage'],
};

export const systemImageGetDescription: INodeProperties[] = [
	{
		displayName:
			'The first call generates a Private File attached to the project; changing the system design and calling again re-generates it. Redirects are followed automatically until the image is returned.',
		name: 'systemImageNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForSystemImageGet,
		},
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		default: 500,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		description: 'Width of the image in pixels',
		displayOptions: {
			show: showOnlyForSystemImageGet,
		},
		routing: {
			send: {
				type: 'query',
				property: 'width',
			},
		},
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		default: 500,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		description: 'Height of the image in pixels',
		displayOptions: {
			show: showOnlyForSystemImageGet,
		},
		routing: {
			send: {
				type: 'query',
				property: 'height',
			},
		},
	},
	{
		displayName: 'Put Output File in Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary output field to put the downloaded image in',
		displayOptions: {
			show: showOnlyForSystemImageGet,
		},
	},
];
