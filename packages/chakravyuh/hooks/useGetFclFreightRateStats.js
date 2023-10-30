import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const useGetFclFreightRateStats = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_charts',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		const { service_type } = filters;
		if (service_type === 'fcl') {
			const params = getFormattedPayload(filters);
			getStats(params);
		}
	}, [filters, getStats]);

	return { data, loading };
};

export default useGetFclFreightRateStats;
