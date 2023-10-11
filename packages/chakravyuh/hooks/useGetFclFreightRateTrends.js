import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const API_MAPPING = {
	fcl : 'get_fcl_freight_rate_trends',
	air : 'get_air_freight_rate_trends',
};

const useGetFclFreightRateTrends = ({ filters }) => {
	const { service_type } = filters;
	const [{ data, loading }, trigger] = useRequest({
		url    : API_MAPPING[service_type],
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), getTrends]);

	return { data: data?.rate_trend || [], loading, getTrends };
};

export default useGetFclFreightRateTrends;
