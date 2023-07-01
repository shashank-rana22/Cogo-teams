import { makeUseAxios } from 'axios-hooks';

import { lensRequest } from '../helpers/lens-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useLensRequest = makeUseAxios({
	axios: lensRequest,
	...commonConfig,
});

export default useLensRequest;
