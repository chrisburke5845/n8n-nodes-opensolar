import type { INodeProperties } from 'n8n-workflow';
import { buildPaymentOptionFieldsCollection } from './fields';

const showOnlyForPaymentOptionUpdate = {
	resource: ['paymentOption'],
	operation: ['update'],
};

export const paymentOptionUpdateDescription: INodeProperties[] = [
	{
		displayName:
			'This is a partial update (PATCH) — only fields added below are sent, everything else on the existing payment option is left untouched.',
		name: 'paymentOptionUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForPaymentOptionUpdate,
		},
	},
	buildPaymentOptionFieldsCollection(showOnlyForPaymentOptionUpdate),
];
