import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const microServices = getMicroServiceName();

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	const newConfig = { ...oldConfig };

	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const authorizationparameters = getAuthorizationParams(store, newConfig.url);

	const apiPath =	newConfig.url.split('/')[1] || newConfig.url.split('/')[0];

	const serviceName = microServices[apiPath];

	newConfig.headers = {
		authorizationscope : 'partner',
		authorization      : `Bearer: ${token}`,
		authorizationparameters,
	};

	if (serviceName === 'user_feedback') {
		newConfig.baseURL = 'https://iris-matrix3.dev.cogoport.io';

		newConfig.url = `/${apiPath}`;
		newConfig.headers.authorizationscope = undefined;
		newConfig.headers.authorization = undefined;
		newConfig.headers.authorizationparameters = undefined;
	}

	return {
		...newConfig,
		paramsSerializer: { serialize: customSerializer },
	};
});

export { request };
