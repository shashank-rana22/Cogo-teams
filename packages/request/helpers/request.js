import { format, getCookie } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_REST_BASE_API_URL });

request.interceptors.request.use((oldConfig) => {
	const token = getCookie('token');
	const auth_scope = getCookie('auth_scope');
	const newConfig = oldConfig;
	newConfig.paramsSerializer = customSerializer;
	newConfig.headers = { authorizationscope: auth_scope };
	newConfig.headers.authorization = `Bearer: ${token}`;

	return newConfig;
});

export { request };
