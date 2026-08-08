import type { INodeProperties } from 'n8n-workflow';
import { projectFieldsCollection } from './fields';

const showOnlyForProjectUpdate = {
	operation: ['update'],
	resource: ['project'],
};

export const projectUpdateDescription: INodeProperties[] = [
	{
		...projectFieldsCollection,
		displayOptions: { show: showOnlyForProjectUpdate },
	},
];
