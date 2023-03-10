import { makeUseAxios } from 'axios-hooks';

import { airRequest } from '../helpers/air-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr    : false,
		manual : true,
	},
};

const usePublicRequest = makeUseAxios({
	axios: airRequest,
	...commonConfig,
});

export default usePublicRequest;
