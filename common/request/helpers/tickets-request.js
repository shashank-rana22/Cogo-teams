import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat: 'brackets', serializeDate: (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};
const ticketsRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_TICKET_REST_BASE_API_URL });

ticketsRequest.interceptors.request.use((oldConfig) => {
	const { authKey = '', ...axiosConfig } = oldConfig;

	const auth = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
	if (process.env.NODE_ENV === 'production') {
		axiosConfig.baseURL = `${process.env.baseUrl}/tickets`;
	}
	const token = getCookie(auth, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(store, authKey);

	return {
		...axiosConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});

export { ticketsRequest };
