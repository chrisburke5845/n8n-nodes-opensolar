import type { INodeProperties } from 'n8n-workflow';
import { buildComponentActivationDescription } from '../../shared/componentActivation';

export const moduleActivationDescription: INodeProperties[] = buildComponentActivationDescription({
	resourceValue: 'moduleActivation',
	resourceLabel: 'Module',
	resourceLabelPlural: 'Modules',
	article: 'a',
	apiPath: 'component_module_activations',
	catalogFieldName: 'module',
	catalogFieldLabel: 'Module URL',
	catalogFieldRequired: true,
	idFieldName: 'moduleActivationId',
	idFieldLabel: 'Module Activation ID',
});
