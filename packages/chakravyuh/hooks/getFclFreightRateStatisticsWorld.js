import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFclFreightRateWorld = ({ flag }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_world',
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

	let maxCount = 0;
	let minCount = Infinity;
	const countMapping = (data?.statistics || []).reduce((acc, { rate_count, country_id }) => {
		acc[country_id] = rate_count;
		maxCount = Math.max(maxCount, rate_count);
		minCount = Math.min(minCount, rate_count);
		return acc;
	}, {});

	useEffect(() => {
		if (flag) {
			getStats();
		}
	}, [flag, getStats]);

	return { data, countMapping, maxCount, minCount, loading };
};

export default useGetFclFreightRateWorld;
