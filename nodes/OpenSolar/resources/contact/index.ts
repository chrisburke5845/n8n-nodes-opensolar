import type { INodeProperties } from 'n8n-workflow';
import { orgIdField, contactIdField } from '../../shared/descriptions';
import { handleWriteResponse } from '../../shared/errors';
import { contactGetManyDescription } from './getAll';
import { contactCreateDescription } from './create';
import { contactUpdateDescription } from './update';

const showOnlyForContacts = {
	resource: ['contact'],
};

const showOnlyForContactsWithId = {
	resource: ['contact'],
	operation: ['get', 'update', 'delete'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForContacts,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Create a new contact',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/orgs/{{$parameter.orgId}}/contacts/',
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
				action: 'Delete a contact',
				description: 'Delete a contact',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/orgs/{{$parameter.orgId}}/contacts/{{$parameter.contactId}}/',
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
				action: 'Get a contact',
				description: 'Get the data of a single contact',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/contacts/{{$parameter.contactId}}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many contacts',
				description: 'List contacts in an org',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/orgs/{{$parameter.orgId}}/contacts/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a contact',
				description: 'Update a contact',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/orgs/{{$parameter.orgId}}/contacts/{{$parameter.contactId}}/',
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
			show: showOnlyForContacts,
		},
	},
	{
		...contactIdField,
		displayOptions: {
			show: showOnlyForContactsWithId,
		},
	},
	...contactGetManyDescription,
	...contactCreateDescription,
	...contactUpdateDescription,
];
