import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const api = {
	fcl_freight : 'list_fcl_freight_rates',
	lcl_freight : 'list_lcl_freight_rates',
	air_freight : 'list_air_freight_rates',
};

const keyFilter = (filter) => Object.fromEntries(
	Object.entries(filter).filter(([, value]) => value !== ''),
);

const useListFreightRate = ({ filter, currentPage }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : api[filter.service],
		method : 'GET',
	}, { manual: true });

	const listFreightRate = useCallback(async () => {
		const updateFilter = keyFilter(filter);
		try {
			await trigger({
				params: {
					filters: {
						// validity_start_greater_than : '2023-01-25T00:00:00+05:30',
						// validity_end_less_than      : '2023-04-24T12:51:22+05:30',
						status                  : 'active',
						is_rate_about_to_expire : true,
						...updateFilter,
					},
					page: currentPage,
				},
			});
		} catch (e) {
			// console.log(e);
		}
	}, [currentPage, filter, trigger]);

	useEffect(() => {
		listFreightRate();
	}, [currentPage, listFreightRate]);

	return {
		data,
		loading,
		listFreightRate,
	};
};
export default useListFreightRate;
