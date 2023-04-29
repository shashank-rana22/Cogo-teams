import { makeUseAxios } from 'axios-hooks';

import { allocationRequest } from '../helpers/allocation-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useAllocationRequest = makeUseAxios({
	axios: allocationRequest,
	...commonConfig,
});

export default useAllocationRequest;
