import type { INodeProperties } from 'n8n-workflow';
import { buildPricingSchemeFieldsCollection } from './fields';

const showOnlyForPricingSchemeUpdate = {
	resource: ['pricingScheme'],
	operation: ['update'],
};

export const pricingSchemeUpdateDescription: INodeProperties[] = [
	{
		displayName:
			'This is a partial update (PATCH) — only fields added below are sent, everything else on the existing pricing scheme is left untouched.',
		name: 'pricingSchemeUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForPricingSchemeUpdate,
		},
	},
	buildPricingSchemeFieldsCollection(showOnlyForPricingSchemeUpdate),
];
