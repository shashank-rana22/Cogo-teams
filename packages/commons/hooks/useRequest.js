import { makeUseAxios } from 'axios-hooks';

import { request } from '../helpers/request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

export const useRequest = makeUseAxios({
	axios: request,
	...commonConfig,
});
