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

	const countMapping = (data?.list || []).reduce((acc, { rate_count, id }) => {
		acc[id] = rate_count;
		return acc;
	}, {});

	useEffect(() => {
		if (flag) {
			getStats();
		}
	}, [flag, getStats]);

	return { data, countMapping, loading };
};

export default useGetFclFreightRateWorld;
