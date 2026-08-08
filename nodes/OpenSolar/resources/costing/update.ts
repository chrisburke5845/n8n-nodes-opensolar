import type { INodeProperties } from 'n8n-workflow';
import { buildCostingFieldsCollection } from './fields';

const showOnlyForCostingUpdate = {
	resource: ['costing'],
	operation: ['update'],
};

export const costingUpdateDescription: INodeProperties[] = [
	{
		displayName:
			'This is a partial update (PATCH) — only fields added below are sent, everything else on the existing costing is left untouched.',
		name: 'costingUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForCostingUpdate,
		},
	},
	buildCostingFieldsCollection(showOnlyForCostingUpdate),
];
