import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
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
<<<<<<< HEAD
	const newConfig = oldConfig;
	newConfig.paramsSerializer = { serialize: customSerializer };
	newConfig.headers = { authorizationscope: 'partner', authorizationparameters: 'coe-booking_note_desk:across_all' };
	newConfig.headers.authorization = `Bearer: 85872a6f-0264-4a62-bf9c-6d5c55024b47`;

	}
);
=======
	const authorizationparameters = getAuthorizationParams(store, oldConfig.url);

	return {
		...oldConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});
>>>>>>> ea83d5df6871a87c13e1779f202d64a59aa7ed0c

export { request };
