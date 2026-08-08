import type { INodeProperties } from 'n8n-workflow';
import { projectIdField } from '../../shared/descriptions';

const showOnlyForProposalDataGet = {
	operation: ['get'],
	resource: ['proposalData'],
};

export const proposalDataGetDescription: INodeProperties[] = [
	{
		displayName:
			'Requires Raw Data API Access — orgs on standard API Access get a clear error instead of the data (HTTP 402). See api-access-plans.md.',
		name: 'proposalDataNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForProposalDataGet,
		},
	},
	{
		...projectIdField,
		description: 'The ID of the project to load proposal data for',
		displayOptions: {
			show: showOnlyForProposalDataGet,
		},
		routing: {
			send: { type: 'query', property: 'project_ids' },
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: showOnlyForProposalDataGet,
		},
		default: {},
		options: [
			{
				displayName: 'Compress Data',
				name: 'compressData',
				type: 'boolean',
				default: false,
				description:
					'Whether to compress large blobs in the response (bills, output, contract template) to reduce payload size — the client must decompress them before use',
				routing: { send: { type: 'query', property: 'compress_data' } },
			},
			{
				displayName: 'Expo Enabled',
				name: 'expoEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include expo-related content in the proposal data',
				routing: { send: { type: 'query', property: 'expo_enabled' } },
			},
			{
				displayName: 'Include Unsold',
				name: 'includeUnsold',
				type: 'boolean',
				default: false,
				description:
					'Whether to include unsold systems in the proposal (otherwise only sold/system-restricted systems may be included, depending on project state)',
				routing: { send: { type: 'query', property: 'include_unsold' } },
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'e.g. en',
				description: 'Language code for proposal content. Defaults to the project language.',
				routing: { send: { type: 'query', property: 'language' } },
			},
		],
	},
];
