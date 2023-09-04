/* eslint-disable custom-eslint/import-from-package-utils */
import store from '@cogoport/store';
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const decodedCustomSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		encode        : false,
		arrayFormat   : 'repeat',
		serializeDate : (date) => format(date),
	});

	return paramsStringify;
};

const cxAutomationRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_CX_AUTOMATION_BASE_URL });

cxAutomationRequest.interceptors.request.use((oldConfig) => {
	const { authKey = '', authkey = '', ...axiosConfig } = oldConfig;

	const auth = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

	const token = getCookie(auth, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(store, (authKey || authkey));

	return {
		...axiosConfig,
		paramsSerializer : { serialize: decodedCustomSerializer },
		headers          : {
			authorizationscope : 'partner',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},
	};
});

export { cxAutomationRequest };
