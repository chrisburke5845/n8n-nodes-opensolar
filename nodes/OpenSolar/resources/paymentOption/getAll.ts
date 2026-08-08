import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForPaymentOptionGetAll = {
	operation: ['getAll'],
	resource: ['paymentOption'],
};

export const paymentOptionGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForPaymentOptionGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForPaymentOptionGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Auto Apply Enabled',
				name: 'autoApplyEnabled',
				type: 'boolean',
				default: false,
				routing: { request: { qs: { auto_apply_enabled: '={{$value}}' } } },
			},
			{
				displayName: 'Payment Type',
				name: 'paymentType',
				type: 'options',
				default: 'cash',
				options: [
					{ name: 'Cash', value: 'cash' },
					{ name: 'Lease', value: 'lease' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'Loan (Advanced)', value: 'loan_advanced' },
					{ name: 'PPA', value: 'ppa' },
					{ name: 'Regular Payment', value: 'regular_payment' },
				],
				routing: { request: { qs: { payment_type: '={{$value}}' } } },
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
				routing: { request: { qs: { priority: '={{$value}}' } } },
			},
		],
	},
];
