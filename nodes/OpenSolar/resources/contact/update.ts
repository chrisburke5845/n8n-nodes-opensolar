import type { INodeProperties } from 'n8n-workflow';
import { contactFieldsCollection } from './fields';

const showOnlyForContactUpdate = {
	operation: ['update'],
	resource: ['contact'],
};

export const contactUpdateDescription: INodeProperties[] = [
	{
		...contactFieldsCollection,
		displayOptions: { show: showOnlyForContactUpdate },
	},
];
