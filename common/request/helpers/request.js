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
	newConfig.paramsSerializer = { serialize: customSerializer };
	newConfig.headers = { authorizationscope: 'partner', authorizationparameters: 'coe-booking_note_desk:across_all' };
	newConfig.headers.authorization = `Bearer: 85872a6f-0264-4a62-bf9c-6d5c55024b47`;

	return newConfig;
});

export { request };
