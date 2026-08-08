import type { INodeProperties } from 'n8n-workflow';
import { buildPaymentOptionFieldsCollection } from './fields';

const showOnlyForPaymentOptionCreate = {
	resource: ['paymentOption'],
	operation: ['create'],
};

export const paymentOptionCreateDescription: INodeProperties[] = [
	buildPaymentOptionFieldsCollection(showOnlyForPaymentOptionCreate),
];
