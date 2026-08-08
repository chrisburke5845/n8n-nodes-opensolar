import type { INodeProperties } from 'n8n-workflow';
import { projectFieldsCollection } from './fields';

const showOnlyForProjectPatch = {
	operation: ['patch'],
	resource: ['project'],
};

export const projectPatchDescription: INodeProperties[] = [
	{
		...projectFieldsCollection,
		displayOptions: { show: showOnlyForProjectPatch },
	},
];
