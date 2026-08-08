import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { orgIdField, paymentOptionIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { mergeFieldsCollectionWithJson } from '../../shared/transport';
import { paymentOptionGetManyDescription } from './getAll';
import { paymentOptionCreateDescription } from './create';
import { paymentOptionUpdateDescription } from './update';

const showOnlyForPaymentOptions = {
	resource: ['paymentOption'],
};

const showOnlyForPaymentOptionsWithId = {
	resource: ['paymentOption'],
	operation: ['get', 'update', 'delete'],
};

const mergePaymentOptionBody = mergeFieldsCollectionWithJson('fields', 'customFields');

/**
 * mergeFieldsCollectionWithJson only JSON-parses its designated catch-all key — these two
 * fields hold their own JSON array values as typed text (see fields.ts) and need the same
 * treatment, so this runs as a second preSend step right after the merge.
 */
async function parsePaymentOptionJsonArrayFields(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as IDataObject;
	for (const key of ['auto_apply_only_specified_states', 'auto_apply_only_specified_zips']) {
		if (typeof body[key] === 'string' && body[key]) {
			body[key] = JSON.parse(body[key] as string);
		}
	}
	return requestOptions;
}

export const paymentOptionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPaymentOptions,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a payment option',
				description: 'Create a new payment option',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/payment_options/',
						ignoreHttpStatusErrors: true,
					},
					send: {
						preSend: [mergePaymentOptionBody, parsePaymentOptionJsonArrayFields],
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a payment option',
				description: 'Delete a payment option',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/payment_options/{{$parameter.paymentOptionId}}/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a payment option',
				description: 'Get the data of a single payment option',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/payment_options/{{$parameter.paymentOptionId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many payment options',
				description: 'List payment options in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/payment_options/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a payment option',
				description: 'Partially update a payment option (PATCH)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/payment_options/{{$parameter.paymentOptionId}}/',
						ignoreHttpStatusErrors: true,
					},
					send: {
						preSend: [mergePaymentOptionBody, parsePaymentOptionJsonArrayFields],
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...orgIdField,
		displayOptions: {
			show: showOnlyForPaymentOptions,
		},
	},
	{
		...paymentOptionIdField,
		displayOptions: {
			show: showOnlyForPaymentOptionsWithId,
		},
	},
	...paymentOptionGetManyDescription,
	...paymentOptionCreateDescription,
	...paymentOptionUpdateDescription,
];
