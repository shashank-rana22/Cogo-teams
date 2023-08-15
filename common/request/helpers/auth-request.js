import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const dataTypes = ['Object', 'Array'].map((d) => `[object ${d}]`);

	const newParams = Object.keys(params).reduce((acc, key) => {
		acc[key] = dataTypes.includes(Object.prototype.toString.call(params[key]))
			? JSON.stringify(params[key])
			: params[key];

		return acc;
	}, {});

	const paramsStringify = qs.stringify(newParams, {
		arrayFormat   : 'repeat',
		serializeDate : (date) => format(date, 'isoUtcDateTime'),
	});

	return paramsStringify;
};

const microServices = getMicroServiceName();

const authRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

authRequest.interceptors.request.use((oldConfig) => {
	const { ...newConfig } = oldConfig;

	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const authorizationparameters = getAuthorizationParams(store, newConfig.url);

	const apiPath = newConfig.url.split('/').pop();

	const originalApiPath = newConfig.url
		.split('/')
		.filter((t) => t)
		.join('/');

	const serviceName = microServices[apiPath];

	if (serviceName) {
		newConfig.url = `/${serviceName}/${originalApiPath}`;
	}

	newConfig.headers = {
		AuthorizationScope      : 'partner',
		AuthorizationParameters : authorizationparameters,
	};

	if (token) {
		newConfig.headers.Authorization = `Bearer: ${token}`;
	}

	return {
		...newConfig,
		paramsSerializer: { serialize: customSerializer },
	};
});

export { authRequest };
