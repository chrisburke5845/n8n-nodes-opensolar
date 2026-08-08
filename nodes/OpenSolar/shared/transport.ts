import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

/**
 * Factory for a preSend hook that builds a request body from a `collection`-type
 * parameter's named fields, merged over an optional raw-JSON catch-all field within
 * that same collection (named fields win on key conflicts). Only keys the user
 * actually added to the collection are ever included — untouched fields are never
 * sent, matching the create/update pattern already used for Project/Contact/etc.
 *
 * Meant for resources whose documented schema is too large to model field-by-field
 * (e.g. Costing's ~200 per-system/per-panel/per-watt cost columns): a handful of
 * named fields cover the common cases, and the JSON field covers everything else.
 * Reusable as-is for Payment Options, Pricing Schemes, and the Hardware Activation
 * resources once their Create/Update routing is confirmed and built.
 */
export function mergeFieldsCollectionWithJson(collectionParamName: string, jsonFieldKey: string) {
	return async function (
		this: IExecuteSingleFunctions,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const fields = this.getNodeParameter(collectionParamName, {}) as IDataObject;
		const { [jsonFieldKey]: jsonBlob, ...namedFields } = fields;

		const body: IDataObject = jsonBlob ? JSON.parse(jsonBlob as string) : {};
		Object.assign(body, namedFields);

		requestOptions.body = body;
		return requestOptions;
	};
}

export async function handleFormattedListResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const returnAsCsv = this.getNodeParameter('returnAsCsv', false) as boolean;
	if (!returnAsCsv) {
		return items;
	}

	const csvText = typeof response.body === 'string' ? response.body : String(response.body);
	const binaryData = await this.helpers.prepareBinaryData(
		Buffer.from(csvText, 'utf-8'),
		'export.csv',
		'text/csv',
	);

	return [{ json: {}, binary: { data: binaryData } }];
}

export async function validateSystemDetailsParts(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const includeParts = this.getNodeParameter('options.includeParts', '') as string;
	const excludeParts = this.getNodeParameter('options.excludeParts', '') as string;

	if (includeParts && excludeParts) {
		throw new NodeOperationError(
			this.getNode(),
			'"Include Parts" and "Exclude Parts" cannot be used together — set only one of them.',
		);
	}

	return requestOptions;
}

export async function preparePrivateFileUpload(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const binaryPropertyName = this.getNodeParameter('binaryPropertyName') as string;
	const title = this.getNodeParameter('title', '') as string;

	const binaryData = this.helpers.assertBinaryData(binaryPropertyName);
	const buffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName);

	const form = new FormData();
	if (title) {
		form.append('title', title);
	}
	form.append(
		'file_contents',
		new Blob([buffer], { type: binaryData.mimeType || 'application/octet-stream' }),
		binaryData.fileName ?? 'file',
	);

	requestOptions.body = form as unknown as IHttpRequestOptions['body'];

	return requestOptions;
}
