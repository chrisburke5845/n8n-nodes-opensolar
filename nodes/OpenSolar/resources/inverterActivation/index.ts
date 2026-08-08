import type { INodeProperties } from 'n8n-workflow';
import { buildComponentActivationDescription } from '../../shared/componentActivation';

export const inverterActivationDescription: INodeProperties[] = buildComponentActivationDescription({
	resourceValue: 'inverterActivation',
	resourceLabel: 'Inverter',
	resourceLabelPlural: 'Inverters',
	article: 'an',
	apiPath: 'component_inverter_activations',
	catalogFieldName: 'inverter',
	catalogFieldLabel: 'Inverter URL',
	catalogFieldRequired: true,
	idFieldName: 'inverterActivationId',
	idFieldLabel: 'Inverter Activation ID',
});
