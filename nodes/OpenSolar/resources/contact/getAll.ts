import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForContactGetAll = {
	operation: ['getAll'],
	resource: ['contact'],
};

export const contactGetManyDescription: INodeProperties[] =
	buildGetManyPaginationFields(showOnlyForContactGetAll);
