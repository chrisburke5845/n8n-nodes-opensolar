import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';

/**
 * Builds the standard "Return All" / "Limit" pair used by every Get Many operation in this
 * node. OpenSolar's list endpoints return a plain JSON array with no count/next metadata, so
 * Return All pages forward while the last page returned a full batch (its size === limit).
 */
export function buildGetManyPaginationFields(show: IDisplayOptions['show']): INodeProperties[] {
	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			displayOptions: { show },
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			routing: {
				send: {
					paginate: '={{ $value }}',
					type: 'query',
					property: 'limit',
					value: '100',
				},
				operations: {
					pagination: {
						type: 'generic',
						properties: {
							continue:
								'={{ Array.isArray($response.body) && $response.body.length === Number($request.qs?.limit ?? 100) }}',
							request: {
								qs: {
									limit: '={{ $request.qs?.limit ?? 100 }}',
									page: '={{ ($request.qs?.page ? Number($request.qs.page) : 1) + 1 }}',
								},
							},
						},
					},
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			displayOptions: { show: { ...show, returnAll: [false] } },
			typeOptions: {
				minValue: 1,
			},
			default: 50,
			routing: {
				send: {
					type: 'query',
					property: 'limit',
				},
				output: {
					maxResults: '={{$value}}',
				},
			},
			description: 'Max number of results to return',
		},
	];
}
