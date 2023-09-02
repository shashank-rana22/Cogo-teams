import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const useGetFclFreightRateTrends = ({ filters }) => {
	const [{ data:fclData, loading:fclLoading }, fclTrigger] = useRequest({
		url    : 'get_fcl_freight_rate_trends',
		method : 'GET',
	}, { manual: true });

	const [{ data:airData, loading:airLoading }, airTrigger] = useRequest({
		url    : 'get_air_freight_rate_trends',
		method : 'GET',
	}, { manual: true });

	const { service_type } = filters;

	const getFclTrends = useCallback(
		async (params) => {
			try {
				await fclTrigger({ params });
			} catch (err) {
				toastApiError(err);
			}
		},
		[fclTrigger],
	);

	const getAirTrends = useCallback(
		async (params) => {
			try {
				await airTrigger({ params });
			} catch (err) {
				toastApiError(err);
			}
		},
		[airTrigger],
	);

	useEffect(() => {
		const params = getFormattedPayload(filters);
		if (service_type === 'fcl') {
			getFclTrends(params);
		} else {
			getAirTrends(params);
		}
	}, [filters, service_type, getFclTrends, getAirTrends]);

	const trendsData = service_type === 'fcl' ? fclData?.rate_trend : airData?.rate_trend;
	const loading = service_type === 'fcl' ? fclLoading : airLoading;
	return { trendsData, loading };
};

export default useGetFclFreightRateTrends;
