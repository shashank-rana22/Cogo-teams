import { makeUseAxios } from 'axios-hooks';

import requestBack from '../helpers/axios-back';
import requestBf from '../helpers/axios-bf';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

export const useRequestBack = makeUseAxios({
	axios: requestBack,
	...commonConfig,
});

export const useRequestBf = makeUseAxios({
	axios: requestBf,
	...commonConfig,
});
