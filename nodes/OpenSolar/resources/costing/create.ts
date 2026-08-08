import type { INodeProperties } from 'n8n-workflow';
import { buildCostingFieldsCollection } from './fields';

const showOnlyForCostingCreate = {
	resource: ['costing'],
	operation: ['create'],
};

export const costingCreateDescription: INodeProperties[] = [
	buildCostingFieldsCollection(showOnlyForCostingCreate),
];
