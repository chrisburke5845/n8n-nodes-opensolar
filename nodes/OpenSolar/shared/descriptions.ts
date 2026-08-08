import type { INodeProperties } from 'n8n-workflow';

export const orgIdField: INodeProperties = {
	displayName: 'Org ID',
	name: 'orgId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 62854',
	description: 'The ID of the OpenSolar org that owns this data',
};

export const projectIdField: INodeProperties = {
	displayName: 'Project ID',
	name: 'projectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 3763174',
	description: 'The ID of the project',
};

export const contactIdField: INodeProperties = {
	displayName: 'Contact ID',
	name: 'contactId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 1721096',
	description: 'The ID of the contact',
};

export const privateFileIdField: INodeProperties = {
	displayName: 'File ID',
	name: 'fileId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 29733',
	description: 'The ID of the private file',
};

export const systemIdField: INodeProperties = {
	displayName: 'System ID',
	name: 'systemId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 1253',
	description: 'The numeric ID of the system',
};

export const systemUuidField: INodeProperties = {
	displayName: 'System UUID',
	name: 'systemUuid',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. E583FD88-EB6C-4311-91A9-AC719041EAA8',
	description: 'The UUID of the system',
};

export const webhookIdField: INodeProperties = {
	displayName: 'Webhook ID',
	name: 'webhookId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 123',
	description: 'The ID of the webhook',
};

export const workflowIdField: INodeProperties = {
	displayName: 'Workflow ID',
	name: 'workflowId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 3',
	description: 'The ID of the workflow',
};

export const roleIdField: INodeProperties = {
	displayName: 'Role ID',
	name: 'roleId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 77',
	description: 'The ID of the role',
};

export const costingIdField: INodeProperties = {
	displayName: 'Costing ID',
	name: 'costingId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 26780',
	description: 'The ID of the costing',
};

export const paymentOptionIdField: INodeProperties = {
	displayName: 'Payment Option ID',
	name: 'paymentOptionId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 1042213',
	description: 'The ID of the payment option',
};

export const pricingSchemeIdField: INodeProperties = {
	displayName: 'Pricing Scheme ID',
	name: 'pricingSchemeId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 459342',
	description: 'The ID of the pricing scheme',
};

export const connectedOrgIdField: INodeProperties = {
	displayName: 'Connection ID',
	name: 'connectedOrgId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'e.g. 123',
	description: 'The ID of the connected org record (not the partner org ID)',
};
