import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const useGetFclFreightRateTrends = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_trends',
		method : 'GET',
	}, { manual: true });

	const getTrends = useCallback(
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
		const params = getFormattedPayload(filters);
		getTrends(params);
	}, [filters, getTrends]);

	return { trendsData: data?.rate_trend, loading };
};

export default useGetFclFreightRateTrends;
