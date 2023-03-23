import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat: 'brackets', serializeDate: (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const customPeeweeSerializer = (params) => {
	const newParams = Object.keys(params).reduce((acc, key) => {
		acc[key] = typeof params[key] === 'object'
			? JSON.stringify(params[key])
			: params[key];
		return acc;
	}, {});
	const paramsStringify = qs.stringify(newParams, {
		arrayFormat: 'repeat', serializeDate: (date) => format(date),
	});

	return paramsStringify;
};

const microServices = getMicroServiceName();

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	const newConfig = { ...oldConfig };
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const authorizationparameters = getAuthorizationParams(store, newConfig.url);

	const apiPath = newConfig.url.split('/').pop();

	const originalApiPath = newConfig.url
		.split('/')
		.filter((t) => t)
		.join('/');

	const serviceName = microServices[apiPath];

	newConfig.paramsSerializer = { serialize: customSerializer };

	if (serviceName) {
		newConfig.url = `/${serviceName}/${originalApiPath}`;
		if (serviceName === 'location'
			&& process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('https://api.cogoport.com')) {
			newConfig.paramsSerializer = { serialize: customPeeweeSerializer };
		}
	}

	return {
		...newConfig,
		headers: {
			authorizationscope: 'partner', authorization: `Bearer: ${token}`, authorizationparameters,
		},
	};
});

export { request };
