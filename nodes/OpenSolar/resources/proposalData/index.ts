import type { INodeProperties } from 'n8n-workflow';
import { handleProposalDataResponse } from '../../shared/errors';
import { proposalDataGetDescription } from './get';

const showOnlyForProposalData = {
	resource: ['proposalData'],
};

export const proposalDataDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProposalData,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get proposal data for a project',
				description:
					'Get the full data behind an OpenSolar proposal — pricing, output, panel placement, financials',
				routing: {
					request: {
						method: 'GET',
						url: '/api/user_logins/',
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [handleProposalDataResponse],
					},
				},
			},
		],
		default: 'get',
	},
	...proposalDataGetDescription,
];
