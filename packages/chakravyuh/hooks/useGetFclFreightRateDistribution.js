import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const useGetFclFreightDistribution = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_distribution',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.log(err);
			}
		},
		[trigger],
	);

	useEffect(() => () => {
		const { params } = getFormattedPayload(filters);

		getStats(params);
	}, [filters, getStats]);

	return { data, loading };
};

export default useGetFclFreightDistribution;
