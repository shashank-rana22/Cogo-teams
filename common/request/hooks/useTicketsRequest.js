import { makeUseAxios } from 'axios-hooks';

import { ticketsRequest } from '../helpers/tickets-request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr    : false,
		manual : true,
	},
};

const useTicketsRequest = makeUseAxios({
	axios: ticketsRequest,
	...commonConfig,
});

export default useTicketsRequest;
