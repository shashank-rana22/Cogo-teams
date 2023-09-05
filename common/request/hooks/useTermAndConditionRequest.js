import { makeUseAxios } from 'axios-hooks';

import { termsRequest } from '../helpers/terms-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr    : false,
		manual : true,
	},
};

const useTermAndConditions = makeUseAxios({
	axios: termsRequest,
	...commonConfig,
});

export default useTermAndConditions;
