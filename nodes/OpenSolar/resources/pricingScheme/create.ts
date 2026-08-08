import type { INodeProperties } from 'n8n-workflow';
import { buildPricingSchemeFieldsCollection } from './fields';

const showOnlyForPricingSchemeCreate = {
	resource: ['pricingScheme'],
	operation: ['create'],
};

export const pricingSchemeCreateDescription: INodeProperties[] = [
	buildPricingSchemeFieldsCollection(showOnlyForPricingSchemeCreate),
];
