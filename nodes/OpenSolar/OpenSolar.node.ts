import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { projectDescription } from './resources/project';
import { contactDescription } from './resources/contact';
import { privateFileDescription } from './resources/privateFile';
import { systemDescription } from './resources/system';
import { systemDetailsDescription } from './resources/systemDetails';
import { systemImageDescription } from './resources/systemImage';
import { webhookDescription } from './resources/webhook';
import { orgDescription } from './resources/org';
import { workflowDescription } from './resources/workflow';
import { roleDescription } from './resources/role';
import { costingDescription } from './resources/costing';
import { paymentOptionDescription } from './resources/paymentOption';
import { pricingSchemeDescription } from './resources/pricingScheme';
import { moduleActivationDescription } from './resources/moduleActivation';
import { inverterActivationDescription } from './resources/inverterActivation';
import { batteryActivationDescription } from './resources/batteryActivation';
import { otherComponentActivationDescription } from './resources/otherComponentActivation';
import { connectedOrgDescription } from './resources/connectedOrg';
import { permissionRoleDescription } from './resources/permissionRole';
import { bulkShareDescription } from './resources/bulkShare';
import { generateDocumentDescription } from './resources/generateDocument';
import { proposalDataDescription } from './resources/proposalData';

export class OpenSolar implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenSolar',
		name: 'openSolar',
		icon: { light: 'file:../../icons/opensolar.svg', dark: 'file:../../icons/opensolar.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the OpenSolar API',
		defaults: {
			name: 'OpenSolar',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'openSolarApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.opensolar.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Battery Activation',
						value: 'batteryActivation',
					},
					{
						name: 'Bulk Share',
						value: 'bulkShare',
					},
					{
						name: 'Connected Org',
						value: 'connectedOrg',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Costing',
						value: 'costing',
					},
					{
						name: 'Generate Document',
						value: 'generateDocument',
					},
					{
						name: 'Inverter Activation',
						value: 'inverterActivation',
					},
					{
						name: 'Module Activation',
						value: 'moduleActivation',
					},
					{
						name: 'Org',
						value: 'org',
					},
					{
						name: 'Other Component Activation',
						value: 'otherComponentActivation',
					},
					{
						name: 'Payment Option',
						value: 'paymentOption',
					},
					{
						name: 'Permission Role',
						value: 'permissionRole',
					},
					{
						name: 'Pricing Scheme',
						value: 'pricingScheme',
					},
					{
						name: 'Private File',
						value: 'privateFile',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Proposal Data',
						value: 'proposalData',
					},
					{
						name: 'Role',
						value: 'role',
					},
					{
						name: 'System',
						value: 'system',
					},
					{
						name: 'System Detail',
						value: 'systemDetails',
					},
					{
						name: 'System Image',
						value: 'systemImage',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Workflow',
						value: 'workflow',
					},
				],
				default: 'project',
			},
			...projectDescription,
			...contactDescription,
			...privateFileDescription,
			...systemDescription,
			...systemDetailsDescription,
			...systemImageDescription,
			...webhookDescription,
			...orgDescription,
			...workflowDescription,
			...roleDescription,
			...costingDescription,
			...paymentOptionDescription,
			...pricingSchemeDescription,
			...moduleActivationDescription,
			...inverterActivationDescription,
			...batteryActivationDescription,
			...otherComponentActivationDescription,
			...connectedOrgDescription,
			...permissionRoleDescription,
			...bulkShareDescription,
			...generateDocumentDescription,
			...proposalDataDescription,
		],
	};
}
