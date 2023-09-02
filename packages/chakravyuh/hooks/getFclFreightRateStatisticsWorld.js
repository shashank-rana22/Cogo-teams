import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFclFreightRateWorld = ({ flag, globalFilters }) => {
	const [{ data:fclData, loading:fclLoading }, fclTrigger] = useRequest({
		url    : 'get_fcl_freight_rate_world',
		method : 'GET',
	}, { manual: true });

	const [{ data:airData, loading:airLoading }, airTrigger] = useRequest({
		url    : 'get_air_freight_rate_world',
		method : 'GET',
	}, { manual: true });

	const getFclStats = useCallback(
		async () => {
			try {
				await fclTrigger();
			} catch (err) {
				// console.log(err);
			}
		},
		[fclTrigger],
	);

	const getAirStats = useCallback(
		async () => {
			try {
				await airTrigger();
			} catch (err) {
				// console.log(err);
			}
		},
		[airTrigger],
	);

	const { service_type } = globalFilters;
	const data = service_type === 'fcl' ? fclData : airData;
	const loading = service_type === 'fcl' ? fclLoading : airLoading;
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
			if (service_type === 'fcl') {
				getFclStats();
			} else {
				getAirStats();
			}
		}
	}, [flag, service_type, getAirStats, getFclStats]);

	return { data, countMapping, maxCount, minCount, loading };
};

export default useGetFclFreightRateWorld;
