import { makeUseAxios } from 'axios-hooks';

import { requestBf } from '../helpers/request-bf';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr        : false,
		autoCancel : true,
	},
};

const useRequestBf = makeUseAxios({
	axios: requestBf,
	...commonConfig,
});

export default useRequestBf;
