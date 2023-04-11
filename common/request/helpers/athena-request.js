import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getMicroServiceName from './get-microservice-name';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const microServices = getMicroServiceName();

const athenaRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

athenaRequest.interceptors.request.use((oldConfig) => {
	const { ...newConfig } = oldConfig;
	const apiPath =	newConfig.url.split('/')[1] || newConfig.url.split('/')[0];
	const serviceName = microServices[apiPath];

	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}

	const authToken = process.env.LAMBDA_SECRET_TOKEN_USER;

	return {
		...newConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			'auth-token': authToken,
		},
	};
});

export { athenaRequest };
