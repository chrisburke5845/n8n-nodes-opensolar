import type {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * OpenSolar's API is standard Django REST Framework (confirmed live for several resources —
 * see RESOURCE-PLAN.md's "Notes for review"). DRF's default error body is one of:
 *   - { "detail": "..." }                          — permission/auth/not-found/throttle errors
 *   - { "non_field_errors": ["...", ...] }          — whole-object validation failures
 *   - { "<field>": ["...", ...], "<field2>": [...] } — per-field validation failures
 * None of these match the generic wrapper keys NodeApiError looks for on its own (`message`,
 * `error`, etc.), so without this, every validation failure surfaces as a bare "Bad request -
 * please check your parameters" with no indication of which field or why. This walks the body
 * and formats whichever shape is present into one readable line.
 */
export function extractDrfErrorMessage(body: unknown): string | undefined {
	if (!body || typeof body !== 'object') {
		return undefined;
	}

	const errors = body as Record<string, unknown>;

	if (typeof errors.detail === 'string') {
		return errors.detail;
	}

	const formatValue = (value: unknown): string => {
		if (Array.isArray(value)) {
			return value
				.map((entry) => (typeof entry === 'string' ? entry : JSON.stringify(entry)))
				.join(' ');
		}
		return typeof value === 'string' ? value : JSON.stringify(value);
	};

	const fieldMessages = Object.entries(errors).map(([field, value]) => {
		const message = formatValue(value);
		return field === 'non_field_errors' ? message : `${field}: ${message}`;
	});

	return fieldMessages.length ? fieldMessages.join(' | ') : undefined;
}

function buildApiError(context: IExecuteSingleFunctions, response: IN8nHttpFullResponse): NodeApiError {
	const body = (response.body as JsonObject) ?? {};
	const drfMessage = extractDrfErrorMessage(response.body);

	return new NodeApiError(context.getNode(), body, {
		httpCode: String(response.statusCode),
		...(drfMessage ? { message: drfMessage } : {}),
	});
}

function throwApiError(
	context: IExecuteSingleFunctions,
	response: IN8nHttpFullResponse,
	throttleMessage: string,
	throttleDescription: string,
): never {
	if (response.statusCode === 429) {
		throw new NodeApiError(context.getNode(), (response.body as JsonObject) ?? {}, {
			httpCode: '429',
			message: throttleMessage,
			description: throttleDescription,
		});
	}

	throw buildApiError(context, response);
}

/**
 * Default write-operation error handler: every Create/Update/Delete operation that doesn't
 * have a resource-specific documented throttle limit (see handleProjectWriteResponse /
 * handlePrivateFileWriteResponse for the two that do) wires this in as `output.postReceive`
 * alongside `request.ignoreHttpStatusErrors: true`, so DRF's actual error body — field
 * validation messages, `detail` on 429/403/404, etc. — reaches the user instead of a generic
 * status-code passthrough.
 */
export async function handleWriteResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode >= 400) {
		throw buildApiError(this, response);
	}

	return items;
}

export async function handleProjectWriteResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode >= 400) {
		throwApiError(
			this,
			response,
			'OpenSolar API throttle limit reached for project writes',
			'Creating and updating projects is limited to 10 requests per minute per user and 10,000 per day per org (see OpenSolar API throttle limits). Wait a moment before retrying, or reduce how often this workflow runs.',
		);
	}

	return items;
}

export async function handleProposalDataResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode === 402) {
		throw new NodeApiError(this.getNode(), (response.body as JsonObject) ?? {}, {
			httpCode: '402',
			message: 'Proposal Data requires Raw Data API Access',
			description:
				"This org's OpenSolar API plan is standard API Access, which does not include the Proposal Data endpoint (GET /api/user_logins/) — it returned HTTP 402 Payment Required. Upgrade to Raw Data API Access to use this operation (see docs/opensolar-api/api-access-plans.md).",
		});
	}

	if (response.statusCode >= 400) {
		throwApiError(
			this,
			response,
			'OpenSolar API throttle limit reached for Proposal Data',
			'Proposal Data is limited to 100 requests per minute per user (see OpenSolar API throttle limits). Wait a moment before retrying, or reduce how often this workflow runs.',
		);
	}

	return items;
}

export async function handlePrivateFileWriteResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode >= 400) {
		throwApiError(
			this,
			response,
			'OpenSolar API throttle limit reached for private files',
			'Creating and updating private files is limited to 1000 requests per day per org and 1000 per hour per user (see OpenSolar API throttle limits). Wait a moment before retrying, or reduce how often this workflow runs.',
		);
	}

	return items;
}
