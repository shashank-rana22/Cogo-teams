import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFclFreightRateStats = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_charts',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async () => {
			try {
				await trigger();
			} catch (err) {
				// console.log(err);
			}
		},
		[trigger],
	);

	useEffect(() => () => {
		getStats();
	}, [getStats]);

	return { data, loading };
};

export default useGetFclFreightRateStats;
