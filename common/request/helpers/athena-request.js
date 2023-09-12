import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getMicroServiceName from './get-microservice-name';

const FIRST_INDEX = 1;

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const microServices = getMicroServiceName();

const athenaRequest = Axios.create({ baseURL: process.env.IHLS_BASE_URL });

athenaRequest.interceptors.request.use((oldConfig) => {
	const { ...newConfig } = oldConfig;
	const apiPath =	newConfig.url.split('/')[FIRST_INDEX] || newConfig.url.split('/')[GLOBAL_CONSTANTS.zeroth_index];
	const serviceName = microServices[apiPath];

	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}

	const authToken = process.env.DATA_PIPELINE_SECRET_KEY;

	return {
		...newConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			'auth-token': authToken,
		},
	};
});

export { athenaRequest };
