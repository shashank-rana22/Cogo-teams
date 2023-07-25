import { useRequest } from '@cogoport/request';
import { subtractDays } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';

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
				// console.log(err);
			}
		},
		[trigger],
	);

	useEffect(() => () => {
		const {
			origin, destination,
			origin_type, destination_type, is_origin_icd, date_diff, is_destination_icd, ...params
		} = filters;

		const endDate = new Date();
		params.startDate = date_diff === 'all' ? undefined : subtractDays(endDate, date_diff);

		LOCATION_KEYS.forEach((key) => {
			if (filters[key]) {
				params[`${key}_${filters[`${key}_type`]}_id`] = filters[key];
			}
		});

		getStats(params);
	}, [filters, getStats]);

	return { data, loading };
};

export default useGetFclFreightRateStats;
