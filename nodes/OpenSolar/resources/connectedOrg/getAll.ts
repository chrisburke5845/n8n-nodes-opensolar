import type { INodeProperties } from 'n8n-workflow';
import { buildGetManyPaginationFields } from '../../shared/pagination';

const showOnlyForConnectedOrgGetAll = {
	operation: ['getAll'],
	resource: ['connectedOrg'],
};

export const connectedOrgGetManyDescription: INodeProperties[] = buildGetManyPaginationFields(
	showOnlyForConnectedOrgGetAll,
);
