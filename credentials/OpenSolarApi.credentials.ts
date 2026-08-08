import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OpenSolarApi implements ICredentialType {
	name = 'openSolarApi';

	displayName = 'OpenSolar API';

	icon: Icon = { light: 'file:../icons/opensolar.svg', dark: 'file:../icons/opensolar.dark.svg' };

	documentationUrl = 'https://developers.opensolar.com/api/';

	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'OpenSolar API bearer token, obtained via POST /api-token-auth/. Standard user tokens expire after 7 days — set "is_machine_user": true on your OpenSolar user (PATCH /auth/users/{user_id}/) so this token does not expire.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.opensolar.com',
			url: '/api/fetch_token/',
			method: 'GET',
		},
	};
}
