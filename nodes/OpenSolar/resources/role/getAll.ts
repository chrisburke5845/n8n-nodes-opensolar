import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForRoleGetAll = {
	operation: ['getAll'],
	resource: ['role'],
};

export const roleGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForRoleGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForRoleGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'Order By',
				name: 'ordering',
				type: 'options',
				default: 'id',
				options: [
					{ name: 'ID (Ascending)', value: 'id' },
					{ name: 'ID (Descending)', value: '-id' },
					{ name: 'Is Admin (False First)', value: 'is_admin' },
					{ name: 'Is Admin (True First)', value: '-is_admin' },
				],
				routing: {
					send: { type: 'query', property: 'ordering' },
				},
			},
		],
	},
];
