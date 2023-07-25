import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';

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
		const {
			origin, destination,
			origin_type, destination_type, is_origin_icd, is_destination_icd, ...params
		} = filters;

		LOCATION_KEYS.forEach((key) => {
			if (filters[key]) {
				params[`${key}_${filters[`${key}_type`]}_id`] = filters[key];
			}
		});

		getStats(params);
	}, [filters, getStats]);

	return { data, loading };
};

export default useGetFclFreightDistribution;
