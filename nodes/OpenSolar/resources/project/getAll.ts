import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForProjectGetAll = {
	operation: ['getAll'],
	resource: ['project'],
};

export const projectGetManyDescription: INodeProperties[] =
	buildGetManyPaginationFields(showOnlyForProjectGetAll);
