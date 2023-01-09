import { makeUseAxios } from 'axios-hooks';

import { bfRequest } from '../helpers/bf-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const usePublicRequest = makeUseAxios({
	axios: bfRequest,
	...commonConfig,
});

export default usePublicRequest;
