import type { INodeProperties } from 'n8n-workflow';
import { orgIdField } from './descriptions';
import { handleWriteResponse } from './errors';
import { buildGetManyPaginationFields } from './pagination';

/**
 * Modules, Inverters, Batteries, and Other Components are "documented as identical in
 * shape" (component_*_activations — activating a catalog component, or for Other
 * Components, a custom one, into an org's catalog). Confirmed live for Modules
 * (2026-08-08, scripts/verify-costing-post-pattern.sh): standard DRF routing, same as
 * Costing/Payment Options/Pricing Schemes — POST to the plain list endpoint creates,
 * PUT/PATCH to :id/ updates, POST to :id/ is never valid despite what the docs say.
 * This factory builds the full resource description (operation dropdown, id field,
 * pagination, Create/Update fields) from a small per-resource config so the four
 * resources don't repeat this shape four times.
 */
export interface ComponentActivationConfig {
	/** Internal `resource` dropdown value, e.g. 'moduleActivation' */
	resourceValue: string;
	/** Singular display label, e.g. 'Module' */
	resourceLabel: string;
	/** Plural display label, e.g. 'Modules' */
	resourceLabelPlural: string;
	/** Indefinite article for the singular label, e.g. 'a' or 'an' */
	article: 'a' | 'an';
	/** Org-scoped API path segment, e.g. 'component_module_activations' */
	apiPath: string;
	/** Body field name for the catalog item reference, e.g. 'module' */
	catalogFieldName: string;
	/** UI label for the catalog reference field, e.g. 'Module URL' */
	catalogFieldLabel: string;
	/** Whether the catalog reference is required to create a record */
	catalogFieldRequired: boolean;
	/** Internal parameter name for this resource's id field, e.g. 'moduleActivationId' */
	idFieldName: string;
	/** UI label for the id field, e.g. 'Module Activation ID' */
	idFieldLabel: string;
}

export function buildComponentActivationDescription(
	config: ComponentActivationConfig,
): INodeProperties[] {
	const showOnlyForResource = { resource: [config.resourceValue] };
	const showOnlyForResourceWithId = {
		resource: [config.resourceValue],
		operation: ['get', 'update', 'delete'],
	};
	const showOnlyForCreate = { resource: [config.resourceValue], operation: ['create'] };
	const showOnlyForUpdate = { resource: [config.resourceValue], operation: ['update'] };
	const showOnlyForGetAll = { resource: [config.resourceValue], operation: ['getAll'] };

	const idField: INodeProperties = {
		displayName: config.idFieldLabel,
		name: config.idFieldName,
		type: 'string',
		default: '',
		required: true,
		description: `The ID of the ${config.resourceLabel.toLowerCase()} activation`,
	};

	const buildFieldsCollection = (show: { resource: string[]; operation: string[] }): INodeProperties => {
		// Options are sorted by displayName below since the catalog reference field's
		// label (and therefore its correct alphabetical position) varies per resource.
		const options: NonNullable<INodeProperties['options']> = [
			{
				displayName: config.catalogFieldLabel,
				name: 'catalogRef',
				type: 'string',
				default: '',
				required: config.catalogFieldRequired,
				description: `URL reference to the catalog ${config.resourceLabel.toLowerCase()}, from the OpenSolar component database`,
				routing: { send: { type: 'body', property: config.catalogFieldName } },
			},
			{
				displayName: 'Cost',
				name: 'cost',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'cost' } },
			},
			{
				displayName: 'Data (JSON)',
				name: 'data',
				type: 'json',
				default: '',
				description: 'Manufacturer-specific spec overrides, sent exactly as typed (as a string)',
				routing: { send: { type: 'body', property: 'data' } },
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_archived' } },
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'body', property: 'is_default' } },
			},
			{
				displayName: 'Price Adjustment',
				name: 'priceAdjustment',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'price_adjustment' } },
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'quantity' } },
			},
		];
		options.sort((a, b) => ('displayName' in a ? a.displayName : '').localeCompare(
			'displayName' in b ? b.displayName : '',
		));

		return {
			displayName: 'Fields',
			name: 'fields',
			type: 'collection',
			placeholder: 'Add Field',
			displayOptions: { show },
			default: {},
			options,
		};
	};

	const label = config.resourceLabel.toLowerCase();
	const pluralLabel = config.resourceLabelPlural.toLowerCase();

	return [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: showOnlyForResource },
			options: [
				{
					name: 'Create',
					value: 'create',
					action: `Create ${config.article} ${label} activation`,
					description: `Create a new ${label} activation`,
					routing: {
						request: {
							method: 'POST',
							url: `=/api/orgs/{{$parameter.orgId}}/${config.apiPath}/`,
							ignoreHttpStatusErrors: true,
						},
						output: {
							postReceive: [handleWriteResponse],
						},
					},
				},
				{
					name: 'Delete',
					value: 'delete',
					action: `Delete ${config.article} ${label} activation`,
					description: `Delete a ${label} activation`,
					routing: {
						request: {
							method: 'DELETE',
							url: `=/api/orgs/{{$parameter.orgId}}/${config.apiPath}/{{$parameter.${config.idFieldName}}}/`,
							ignoreHttpStatusErrors: true,
						},
						output: {
							postReceive: [handleWriteResponse],
						},
					},
				},
				{
					name: 'Get',
					value: 'get',
					action: `Get ${config.article} ${label} activation`,
					description: `Get the data of a single ${label} activation`,
					routing: {
						request: {
							method: 'GET',
							url: `=/api/orgs/{{$parameter.orgId}}/${config.apiPath}/{{$parameter.${config.idFieldName}}}/`,
						},
					},
				},
				{
					name: 'Get Many',
					value: 'getAll',
					action: `Get many ${pluralLabel} activations`,
					description: `List ${pluralLabel} activations in an org`,
					routing: {
						request: {
							method: 'GET',
							url: `=/api/orgs/{{$parameter.orgId}}/${config.apiPath}/`,
						},
					},
				},
				{
					name: 'Update',
					value: 'update',
					action: `Update ${config.article} ${label} activation`,
					description: `Partially update a ${label} activation (PATCH)`,
					routing: {
						request: {
							method: 'PATCH',
							url: `=/api/orgs/{{$parameter.orgId}}/${config.apiPath}/{{$parameter.${config.idFieldName}}}/`,
							ignoreHttpStatusErrors: true,
						},
						output: {
							postReceive: [handleWriteResponse],
						},
					},
				},
			],
			default: 'getAll',
		},
		{
			...orgIdField,
			displayOptions: { show: showOnlyForResource },
		},
		{
			...idField,
			displayOptions: { show: showOnlyForResourceWithId },
		},
		...buildGetManyPaginationFields(showOnlyForGetAll),
		buildFieldsCollection(showOnlyForCreate),
		{
			displayName:
				'This is a partial update (PATCH) — only fields added below are sent, everything else on the existing record is left untouched.',
			name: 'componentActivationUpdateNotice',
			type: 'notice',
			default: '',
			displayOptions: { show: showOnlyForUpdate },
		},
		buildFieldsCollection(showOnlyForUpdate),
	];
}
