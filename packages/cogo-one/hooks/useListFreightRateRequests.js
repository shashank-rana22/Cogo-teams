import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const API_MAPPING = {
	air_freight : 'list_air_freight_rate_requests',
	fcl_freight : 'list_fcl_freight_rate_requests',
	fcl_customs : 'list_fcl_customs_rate_requests',
	haulage     : 'list_haulage_freight_rate_requests',
	lcl_freight : 'list_lcl_freight_rate_requests',
	lcl_customs : 'list_lcl_customs_rate_requests',
	air_customs : 'list_air_customs_rate_requests',
	trailer     : 'list_trailer_freight_rate_requests',
	ltl_freight : 'list_ltl_freight_rate_requests',
	ftl_freight : 'list_ftl_freight_rate_requests',
	fcl_cfs     : 'list_fcl_cfs_rate_requests',
};

const getParams = ({ sourceId }) => ({
	filters: { id: sourceId },
});

const useListFreightRateRequests = ({
	sourceId = '',
	params = {},
}) => {
	const apiName = API_MAPPING[params?.service];

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'GET',
	}, { manual: true });

	const getFreightRateRequest = useCallback(
		async () => {
			if (!apiName) {
				return;
			}

			try {
				await trigger(
					{
						params: getParams({ sourceId }),
					},
				);
			} catch (err) {
				console.error(err);
			}
		},
		[apiName, sourceId, trigger],
	);

	return {
		requestLoading : loading,
		requestData    : data,
		getFreightRateRequest,
	};
};

export default useListFreightRateRequests;
