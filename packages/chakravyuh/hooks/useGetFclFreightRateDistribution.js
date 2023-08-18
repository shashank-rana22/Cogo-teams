import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const useGetFclFreightDistribution = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_distribution',
		method : 'GET',
	}, { manual: true });

	const { mode, ...rest } = filters;

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

	useEffect(() => {
		const params = getFormattedPayload(rest);
		getStats(params);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [(JSON.stringify(rest)), getStats]);

	return { data, loading };
};

export default useGetFclFreightDistribution;
