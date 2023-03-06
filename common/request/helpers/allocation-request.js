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

const microServices = getMicroServiceName();

const allocationRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

allocationRequest.interceptors.request.use((oldConfig) => {
	const { authkey = '', ...newConfig } = oldConfig;

	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const authorizationparameters = getAuthorizationParams(store, authkey || newConfig.url);

	const apiPath =	newConfig.url.split('/')[1] || newConfig.url.split('/')[0];

	const serviceName = microServices[authkey || apiPath];

	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}

	return {
		...newConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});

export { allocationRequest };
