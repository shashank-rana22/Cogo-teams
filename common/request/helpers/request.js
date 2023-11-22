import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
// eslint-disable-next-line custom-eslint/import-from-package-utils
import { getCookie } from './getCookieFromCtx';

const PEEWEE_SERVICES = ['fcl_freight_rate', 'fcl_customs_rate', 'fcl_cfs_rate', 'air_freight_rate',
	'haulage_freight_rate', 'ftl_freight_rate', 'air_customs_rate', 'athena'];

const MAPS_SERVICES = ['location', 'sailing_schedule'];

const ATHENA_SERVICE = 'athena';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat: 'brackets', serializeDate: (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const customPeeweeSerializer = (params) => {
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

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	const newConfig = { ...oldConfig };
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const isDevMode = !process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('https://api.cogoport.com');

	const authorizationparameters = getAuthorizationParams(store, newConfig.url);
	const apiPath = newConfig.url.split('/').pop();

	const originalApiPath = newConfig.url
		.split('/')
		.filter((t) => t)
		.join('/');

	const serviceName = newConfig?.service_name || microServices[apiPath];

	newConfig.paramsSerializer = { serialize: customSerializer };

	if (serviceName) {
		newConfig.url = `/${serviceName}/${originalApiPath}`;
		if (
			PEEWEE_SERVICES.includes(serviceName)
			|| (MAPS_SERVICES.includes(serviceName)
			&& !isDevMode)) {
			newConfig.paramsSerializer = { serialize: customPeeweeSerializer };
		}
	}
	if (PEEWEE_SERVICES.includes(serviceName) && isDevMode) {
		newConfig.baseURL = 'https://f5b4-2401-4900-1c96-b097-91c4-19eb-d800-f060.ngrok-free.app'; // Remove this later
	}
	if (serviceName === ATHENA_SERVICE) {
		newConfig.auth_token = process.env.DATA_PIPELINE_SECRET_KEY;
	}

	return {
		...newConfig,
		headers: {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
			'auth-token'       : newConfig.auth_token || undefined,
		},
	};
});

export { request };
