import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForPrivateFileGetAll = {
	operation: ['getAll'],
	resource: ['privateFile'],
};

export const privateFileGetManyDescription: INodeProperties[] = [
	...buildGetManyPaginationFields(showOnlyForPrivateFileGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForPrivateFileGetAll,
		},
		default: {},
		options: [
			{
				displayName: 'File Tag',
				name: 'fileTags',
				type: 'string',
				default: '',
				description: 'Only return files with this file tag title, e.g. "Site Model"',
				routing: { request: { qs: { file_tags: '={{$value}}' } } },
			},
			{
				displayName: 'File Tag to Exclude',
				name: 'fileTagsExclude',
				type: 'string',
				default: '',
				description: 'Exclude files with this file tag title',
				routing: { request: { qs: { file_tags_exclude: '={{$value}}' } } },
			},
			{
				displayName: 'Order By',
				name: 'ordering',
				type: 'options',
				default: '-modified_date',
				options: [
					{ name: 'Created Date (Newest First)', value: '-created_date' },
					{ name: 'Created Date (Oldest First)', value: 'created_date' },
					{ name: 'Filesize (Largest First)', value: '-filesize' },
					{ name: 'Filesize (Smallest First)', value: 'filesize' },
					{ name: 'Modified Date (Newest First)', value: '-modified_date' },
					{ name: 'Modified Date (Oldest First)', value: 'modified_date' },
					{ name: 'Status (A-Z)', value: 'status' },
					{ name: 'Status (Z-A)', value: '-status' },
					{ name: 'Title (A-Z)', value: 'title' },
					{ name: 'Title (Z-A)', value: '-title' },
				],
				routing: { request: { qs: { ordering: '={{$value}}' } } },
			},
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'string',
				default: '',
				description: 'Only return files attached to this project',
				routing: { request: { qs: { project: '={{$value}}' } } },
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description:
					'Search across title, system_uuid, input_data, input_data_hash, file_hash, status, status_message',
				routing: { request: { qs: { search: '={{$value}}' } } },
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Only return files created by this user',
				routing: { request: { qs: { user_id: '={{$value}}' } } },
			},
		],
	},
];
