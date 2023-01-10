import { makeUseAxios } from 'axios-hooks';

import { publicRequest } from '../helpers/public-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const usePublicRequest = makeUseAxios({
	axios: publicRequest,
	...commonConfig,
});

export default usePublicRequest;
