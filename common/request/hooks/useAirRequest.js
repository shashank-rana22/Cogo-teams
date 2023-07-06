import { makeUseAxios } from 'axios-hooks';

import { airRequest } from '../helpers/air-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr    : false,
		manual : true,
	},
};

const useRequestAir = makeUseAxios({
	axios: airRequest,
	...commonConfig,
});

export default useRequestAir;
