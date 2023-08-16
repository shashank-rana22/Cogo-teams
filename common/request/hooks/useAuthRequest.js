import { makeUseAxios } from 'axios-hooks';

import { authRequest } from '../helpers/auth-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useAuthRequest = makeUseAxios({
	axios: authRequest,
	...commonConfig,
});

export default useAuthRequest;
