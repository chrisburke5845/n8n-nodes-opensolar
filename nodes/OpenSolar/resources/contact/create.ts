import type { INodeProperties } from 'n8n-workflow';
import { contactFieldsCollection } from './fields';

const showOnlyForContactCreate = {
	operation: ['create'],
	resource: ['contact'],
};

export const contactCreateDescription: INodeProperties[] = [
	{
		...contactFieldsCollection,
		displayOptions: { show: showOnlyForContactCreate },
	},
];
