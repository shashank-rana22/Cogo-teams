import { makeUseAxios } from 'axios-hooks';

import { athenaRequest } from '../helpers/athena-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useAthenaRequest = makeUseAxios({
	axios: athenaRequest,
	...commonConfig,
});

export default useAthenaRequest;
