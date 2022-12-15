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
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
	const newConfig = oldConfig;
	newConfig.paramsSerializer = customSerializer;
	newConfig.headers = { authorizationscope: 'partner' };
	newConfig.headers.authorization = `Bearer: ${token}`;

	return newConfig;
});

export { request };
