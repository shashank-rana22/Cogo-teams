import { makeUseAxios } from 'axios-hooks';

import { request } from '../helpers/request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useRequest = makeUseAxios({
	axios: request,
	...commonConfig,
	authorizationparameters:
	'coe-fcl_revenue_desk:across_all'

});

export default useRequest;
