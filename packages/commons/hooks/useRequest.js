import { makeUseAxios } from 'axios-hooks';

import { request, requestPublic, requestV2 } from '../helpers/request';

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

export const useRequestV2 = makeUseAxios({
	axios: requestV2,
	...commonConfig,
});
export const useRequestPublic = makeUseAxios({
	axios: requestPublic,
	...commonConfig,
});
