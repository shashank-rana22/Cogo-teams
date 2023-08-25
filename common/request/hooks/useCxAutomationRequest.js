import { makeUseAxios } from 'axios-hooks';

import { cxAutomationRequest } from '../helpers/cx-automation-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useCxAutomationRequest = makeUseAxios({
	axios: cxAutomationRequest,
	...commonConfig,
});

export default useCxAutomationRequest;
