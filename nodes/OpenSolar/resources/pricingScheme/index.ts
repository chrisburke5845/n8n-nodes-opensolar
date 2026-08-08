import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, pricingSchemeIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { pricingSchemeGetManyDescription } from './getAll';
import { pricingSchemeCreateDescription } from './create';
import { pricingSchemeUpdateDescription } from './update';

const showOnlyForPricingSchemes = {
	resource: ['pricingScheme'],
};

const showOnlyForPricingSchemesWithId = {
	resource: ['pricingScheme'],
	operation: ['get', 'update', 'delete'],
};

export const pricingSchemeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPricingSchemes,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a pricing scheme',
				description: 'Create a new pricing scheme',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/pricing_schemes/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleWriteResponse],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a pricing scheme',
				description: 'Delete a pricing scheme',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/pricing_schemes/{{$parameter.pricingSchemeId}}/',
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
				action: 'Get a pricing scheme',
				description: 'Get the data of a single pricing scheme',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/pricing_schemes/{{$parameter.pricingSchemeId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many pricing schemes',
				description: 'List pricing schemes in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/pricing_schemes/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a pricing scheme',
				description: 'Partially update a pricing scheme (PATCH)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/orgs/{{$parameter.orgId}}/pricing_schemes/{{$parameter.pricingSchemeId}}/',
						ignoreHttpStatusErrors: true,
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
			show: showOnlyForPricingSchemes,
		},
	},
	{
		...pricingSchemeIdField,
		displayOptions: {
			show: showOnlyForPricingSchemesWithId,
		},
	},
	...pricingSchemeGetManyDescription,
	...pricingSchemeCreateDescription,
	...pricingSchemeUpdateDescription,
];
