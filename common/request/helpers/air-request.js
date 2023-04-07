import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const decodedCustomSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		encode        : false,
		arrayFormat   : 'repeat',
		serializeDate : (date) => format(date),
	});

	return paramsStringify;
};

const airRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_AIR_SERVICE_BASE_URL });

airRequest.interceptors.request.use((oldConfig) => {
	const { authKey = '', ...axiosConfig } = oldConfig;

	const auth = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

	const token = getCookie(auth, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(store, authKey);

	return {
		...axiosConfig,
		paramsSerializer : { serialize: decodedCustomSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});

export { airRequest };
