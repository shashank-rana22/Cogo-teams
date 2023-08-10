import { makeUseAxios } from 'axios-hooks';

import { harbourRequest } from '../helpers/harbour-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useHarbourRequest = makeUseAxios({
	axios: harbourRequest,
	...commonConfig,
});

export default useHarbourRequest;
