import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import { getCookieFromCtx } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	console.log("old",oldConfig)
	const token = getCookieFromCtx(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, oldConfig.ctx);
	const newConfig = oldConfig;
	newConfig.paramsSerializer = customSerializer;
	// newConfig.headers = { authorizationscope: 'partner' , authorizationparameters:
	// 'coe-fcl_revenue_desk:across_all'};
	// newConfig.headers.authorization = `Bearer: 3598c948-7334-4eb5-a308-aee81af6cd93`;

	return newConfig;
});

export { request };
