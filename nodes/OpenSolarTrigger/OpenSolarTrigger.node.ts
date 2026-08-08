import type {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { orgIdField } from '../OpenSolar/shared/descriptions';
import { openSolarApiRequest } from './GenericFunctions';

interface OpenSolarWebhook {
	id: number;
	url: string;
	endpoint: string;
	enabled: boolean;
	debug: boolean;
	trigger_fields: string[] | null;
	payload_fields: string[] | null;
}

export class OpenSolarTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenSolar Trigger',
		name: 'openSolarTrigger',
		icon: { light: 'file:../../icons/opensolar.svg', dark: 'file:../../icons/opensolar.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["models"].join(", ")}}',
		description: 'Starts the workflow when OpenSolar sends a webhook for the selected models',
		defaults: {
			name: 'OpenSolar Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'openSolarApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName:
					"OpenSolar's Webhooks API has no documented delete endpoint. Deactivating this node (or deleting it) disables the webhook in OpenSolar via PATCH enabled=false rather than removing it — the subscription will still be visible, disabled, under Control -> Integrations -> Webhooks in the OpenSolar app.",
				name: 'openSolarTriggerNotice',
				type: 'notice',
				default: '',
			},
			{
				...orgIdField,
			},
			{
				displayName: 'Models',
				name: 'models',
				type: 'multiOptions',
				options: [
					{
						name: 'Contact',
						value: 'contact',
						description: 'Fires on create/update/delete of a Contact',
					},
					{
						name: 'Event',
						value: 'event',
						description: 'Fires on create/update/delete of an Event',
					},
					{
						name: 'Project',
						value: 'project',
						description: 'Fires on create/update/delete of a Project',
					},
					{
						name: 'Quote',
						value: 'quote',
						description: 'Fires on create/update/delete of a supplier Quote',
					},
					{
						name: 'QuoteActivityLog',
						value: 'quoteactivitylog',
						description: 'Fires on create/delete of a QuoteActivityLog entry (never update)',
					},
				],
				required: true,
				default: [],
				description:
					'Which OpenSolar models to subscribe to. Each selection is sent to OpenSolar as "&lt;model&gt;.*" in trigger_fields and payload_fields, so all fields of the model are included — see webhooks.md.',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const orgId = this.getNodeParameter('orgId') as string;
				const webhookData = this.getWorkflowStaticData('node');

				const webhooks = (await openSolarApiRequest.call(
					this,
					'GET',
					`/api/orgs/${orgId}/webhooks/`,
				)) as unknown as OpenSolarWebhook[];

				const existing = webhooks.find((webhook) => webhook.endpoint === webhookUrl);

				if (existing === undefined) {
					delete webhookData.webhookId;
					return false;
				}

				// Store the id even when disabled, so create() can PATCH it back to
				// enabled instead of creating a duplicate webhook for the same URL.
				webhookData.webhookId = existing.id;

				return existing.enabled;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const orgId = this.getNodeParameter('orgId') as string;
				const models = this.getNodeParameter('models', []) as string[];
				const webhookData = this.getWorkflowStaticData('node');

				const triggerFields = models.map((model) => `${model}.*`);

				if (webhookData.webhookId !== undefined) {
					// checkExists() found a matching-but-disabled webhook from a previous
					// run of this node (see delete()) — re-enable and update it instead
					// of creating a second webhook pointed at the same URL.
					await openSolarApiRequest.call(
						this,
						'PATCH',
						`/api/orgs/${orgId}/webhooks/${webhookData.webhookId}/`,
						{
							enabled: true,
							trigger_fields: triggerFields,
							payload_fields: triggerFields,
						},
					);

					return true;
				}

				const responseData = (await openSolarApiRequest.call(
					this,
					'POST',
					`/api/orgs/${orgId}/webhooks/`,
					{
						endpoint: webhookUrl,
						enabled: true,
						debug: false,
						trigger_fields: triggerFields,
						payload_fields: triggerFields,
					},
				)) as unknown as OpenSolarWebhook;

				webhookData.webhookId = responseData.id;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const orgId = this.getNodeParameter('orgId') as string;
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return true;
				}

				// No documented DELETE for this endpoint — disable instead (see the
				// node's notice). The webhook row remains in OpenSolar, disabled. Let
				// failures propagate (openSolarApiRequest wraps them as NodeApiError)
				// rather than silently reporting success.
				await openSolarApiRequest.call(
					this,
					'PATCH',
					`/api/orgs/${orgId}/webhooks/${webhookData.webhookId}/`,
					{ enabled: false },
				);

				delete webhookData.webhookId;

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;

		return {
			workflowData: [this.helpers.returnJsonArray([bodyData])],
		};
	}
}
