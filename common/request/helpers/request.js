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
		serializeDate : (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const customPeeweeSerializer = (params) => {
	const newParams = {};
	Object.keys(params).forEach((key) => {
		if (typeof params[key] === 'object') {
			newParams[key] = JSON.stringify(params[key]);
		} else {
			newParams[key] = params[key];
		}
	});
	const paramsStringify = qs.stringify(newParams, {
		arrayFormat   : 'repeat',
		serializeDate : (date) => format(date),
	});

	return paramsStringify;
};

const microServices = getMicroServiceName();

const request = Axios.create();

request.interceptors.request.use((oldConfig) => {
	const newConfig = { ...oldConfig };
	let baseURL = process.env.NEXT_PUBLIC_REST_BASE_API_URL;
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const authorizationparameters = getAuthorizationParams(store, newConfig.url);

	const apiPath =	newConfig.url.split('/')[1] || newConfig.url.split('/')[0];

	const serviceName = microServices[apiPath];

	newConfig.paramsSerializer = customSerializer;

	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
		if (serviceName === 'locations') {
			baseURL = process.env.NEXT_PUBLIC_COGO_MAPS_URL;
			newConfig.paramsSerializer = customPeeweeSerializer;
		}
	}
	newConfig.baseURL = baseURL;

	return {
		...newConfig,
		headers: {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});

export { request };
