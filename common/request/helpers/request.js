import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(store, oldConfig.url);

	return {
		...oldConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: 2728f0a5-dda6-45cc-89b7-bdeb05d48e96`,
			authorizationparameters : 'coe-booking_note_desk:across_all',
		},
	};
});

export { request };
