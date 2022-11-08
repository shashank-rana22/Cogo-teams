import { makeUseAxios } from 'axios-hooks';

import {request,requestV2} from "../helpers/request"

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
