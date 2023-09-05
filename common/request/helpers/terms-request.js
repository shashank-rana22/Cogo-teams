import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	// console.log('params', params);
	const paramsStringify = qs.stringify(params, {
		arrayFormat: 'brackets', serializeDate: (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};
const termsRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

termsRequest.interceptors.request.use((oldConfig) => {
	const { authkey = '', ...axiosConfig } = oldConfig;

	// const isDevMode = !process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('https://api.cogoport.com');

	const auth = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
	// if (!isDevMode) {
	// 	axiosConfig.baseURL = `${process.env.NEXT_PUBLIC_REST_BASE_API_URL}/list_terms_and_conditions`;
	// }
	const token = getCookie(auth, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(store, authkey);

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

export { termsRequest };
