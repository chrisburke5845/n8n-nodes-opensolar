import type { INodeProperties } from 'n8n-workflow';
import { buildComponentActivationDescription } from '../../shared/componentActivation';

export const batteryActivationDescription: INodeProperties[] = buildComponentActivationDescription({
	resourceValue: 'batteryActivation',
	resourceLabel: 'Battery',
	resourceLabelPlural: 'Batteries',
	article: 'a',
	apiPath: 'component_battery_activations',
	catalogFieldName: 'battery',
	catalogFieldLabel: 'Battery URL',
	catalogFieldRequired: true,
	idFieldName: 'batteryActivationId',
	idFieldLabel: 'Battery Activation ID',
});
