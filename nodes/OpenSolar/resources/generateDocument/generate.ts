import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGenerateDocumentGenerate = {
	operation: ['generate'],
	resource: ['generateDocument'],
};

const documentTypeOptions = [
	{ name: 'Bill Calculations (CSV)', value: 'bill_calculations_csv' },
	{ name: 'Change Order Document', value: 'change_order' },
	{ name: 'Contract (with Proposal)', value: 'contract' },
	{ name: 'Contract Only', value: 'contract_only' },
	{ name: 'Energy Yield Report', value: 'energy_yield_report' },
	{ name: 'Financials Report', value: 'financials_report' },
	{ name: 'Generic Document', value: 'generic_document' },
	{ name: 'Global Bill of Materials', value: 'global_bom' },
	{ name: 'Greenlancer Project Summary', value: 'greenlancer_project_summary' },
	{ name: 'Installation Instructions', value: 'installation_instructions' },
	{ name: 'IronRidge Bill of Materials', value: 'ironridge_bom' },
	{ name: 'Lightreach Sales Design Details', value: 'lightreach_sales_design_details' },
	{ name: 'MCS Structural Report', value: 'structural_report_mcs' },
	{ name: "Owner's Manual", value: 'owners_manual' },
	{ name: 'Proposal (with Contract)', value: 'proposal' },
	{ name: 'Proposal Only', value: 'proposal_only' },
	{ name: 'PV Site Plan', value: 'pv_site_plan' },
	{ name: 'Shade Report', value: 'shade_report' },
	{ name: 'System Image', value: 'system_image_only' },
	{ name: 'System Performance (8760 Hourly, CSV)', value: 'system_performance_8760' },
	{ name: 'System Performance Image', value: 'system_performance_image_only' },
];

export const generateDocumentGenerateDescription: INodeProperties[] = [
	{
		displayName:
			'The response may be the generated file itself, a URL, or (with Action = Save as Private File) a JSON reference to a Private File — use the Private File resource to retrieve/download that. This operation always stores the raw response in the output binary field below; a JSON reference will need to be parsed from it.',
		name: 'generateDocumentNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForGenerateDocumentGenerate,
		},
	},
	{
		displayName: 'Document Type',
		name: 'documentType',
		type: 'options',
		noDataExpression: true,
		options: documentTypeOptions,
		default: 'proposal',
		required: true,
		displayOptions: {
			show: showOnlyForGenerateDocumentGenerate,
		},
	},
	{
		displayName: 'Put Output File in Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary output field to put the generated document in',
		displayOptions: {
			show: showOnlyForGenerateDocumentGenerate,
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: showOnlyForGenerateDocumentGenerate,
		},
		default: {},
		options: [
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{ name: 'Return the Document', value: '' },
					{ name: 'Save as Private File', value: 'save' },
				],
				default: '',
				description: 'Whether to save the generated document as a Private File on the project',
				routing: { send: { type: 'query', property: 'action' } },
			},
			{
				displayName: 'Document Template ID',
				name: 'documentTemplateId',
				type: 'string',
				default: '',
				description:
					'ID of a custom document template to use instead of the default, found in Control -> Other -> Document Templates in the OpenSolar app',
				routing: { send: { type: 'query', property: 'document_template_id' } },
			},
			{
				displayName: 'File Format',
				name: 'fileFormat',
				type: 'options',
				options: [
					{ name: 'PDF', value: 'pdf' },
					{ name: 'CSV', value: 'csv' },
				],
				default: 'pdf',
				description:
					'Output format. Optional; default depends on document type (most default to PDF; system_performance_8760, bill_calculations_csv, and financials_report can default to CSV).',
				routing: { send: { type: 'query', property: 'file_format' } },
			},
			{
				displayName: 'File Tags',
				name: 'fileTags',
				type: 'string',
				default: '',
				description: 'Tag to apply to the generated file when saved as a Private File',
				routing: { send: { type: 'query', property: 'file_tags' } },
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'e.g. en',
				routing: { send: { type: 'query', property: 'language' } },
			},
			{
				displayName: 'Payment Option ID',
				name: 'paymentOptionId',
				type: 'string',
				default: '',
				routing: { send: { type: 'query', property: 'payment_option_id' } },
			},
			{
				displayName: 'System UUID',
				name: 'systemUuid',
				type: 'string',
				default: '',
				description: 'Which system to generate the document for',
				routing: { send: { type: 'query', property: 'system_uuid' } },
			},
			{
				displayName: 'Temporary',
				name: 'temporary',
				type: 'boolean',
				default: false,
				routing: { send: { type: 'query', property: 'temporary' } },
			},
		],
	},
];
