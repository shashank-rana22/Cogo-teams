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
	const token = getCookieFromCtx(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, oldConfig.ctx);
	const newConfig = oldConfig;
	newConfig.paramsSerializer = customSerializer;
	newConfig.headers = { authorizationscope: 'partner' };
	newConfig.headers.authorization = `Bearer: ${token}`;

	return newConfig;
});

export { request };
