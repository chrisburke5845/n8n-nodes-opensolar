import type { INodeProperties } from 'n8n-workflow';
import { buildComponentActivationDescription } from '../../shared/componentActivation';

export const otherComponentActivationDescription: INodeProperties[] = buildComponentActivationDescription({
	resourceValue: 'otherComponentActivation',
	resourceLabel: 'Other Component',
	resourceLabelPlural: 'Other Components',
	article: 'an',
	apiPath: 'component_other_activations',
	catalogFieldName: 'other',
	catalogFieldLabel: 'Other Component URL',
	// Unlike Module/Inverter/Battery, other-components.md shows "other": null as a normal
	// state — this resource supports a custom/manual entry without a catalog reference.
	catalogFieldRequired: false,
	idFieldName: 'otherComponentActivationId',
	idFieldLabel: 'Other Component Activation ID',
});
