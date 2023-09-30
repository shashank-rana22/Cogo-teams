import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListFreightRateRequests = ({ source_id, filter }) => {
	const API = {
		fcl_freight     : 'list_fcl_freight_rate_requests',
		air_freight     : 'list_air_freight_rate_requests',
		fcl_customs     : 'list_fcl_customs_rate_requests',
		haulage_freight : 'list_haulage_freight_rate_requests',
		lcl_freight     : 'list_lcl_freight_rate_requests',
		lcl_customs     : 'list_lcl_customs_rate_requests',
		air_customs     : 'list_air_customs_rate_requests',
		trailer_freight : 'list_trailer_freight_rate_requests',
		ltl_freight     : 'list_ltl_freight_rate_requests',
	};

	const apiName = API[filter?.service];

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'GET',
	}, { manual: true });

	const getRequest = useCallback(async () => {
		try {
			await trigger(
				{
					params: {
						filters: { id: source_id },
					},
				},
			);
		} catch (err) {
			// console.log(err);
		}
	}, [source_id, trigger]);

	return {
		loading,
		data,
		getRequest,
	};
};

export default useListFreightRateRequests;
