import type { INodeProperties } from 'n8n-workflow';
import { projectFieldsCollection } from './fields';

const showOnlyForProjectCreate = {
	operation: ['create'],
	resource: ['project'],
};

export const projectCreateDescription: INodeProperties[] = [
	{
		...projectFieldsCollection,
		displayOptions: { show: showOnlyForProjectCreate },
	},
];
