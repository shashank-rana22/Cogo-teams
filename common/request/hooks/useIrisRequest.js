import { makeUseAxios } from 'axios-hooks';

import { irisRequest } from '../helpers/iris-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useIrisRequest = makeUseAxios({
	axios: irisRequest,
	...commonConfig,
});

export default useIrisRequest;
