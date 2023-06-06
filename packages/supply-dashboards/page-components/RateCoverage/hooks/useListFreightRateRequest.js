import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const api = {
	fcl_freight : 'list_fcl_freight_rate_requests',
	lcl_freight : 'list_lcl_freight_rate_requests',
	air_freight : 'list_air_freight_rate_requests',
};

const keyFilter = (filter) => Object.fromEntries(
	Object.entries(filter).filter(([, value]) => value !== ''),
);

const useListFreightRateRequest = ({ filter, currentPage }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : api[filter.service],
		method : 'GET',
	}, { manual: true });

	const listFreightRateRequest = useCallback(async () => {
		const updateFilter = keyFilter(filter);
		try {
			await trigger({
				params: {
					filters: {
						validity_start_greater_than : '2023-01-25T00:00:00+05:30',
						validity_end_less_than      : '2023-04-24T12:51:22+05:30',
						status                      : 'active',
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
		listFreightRateRequest();
	}, [currentPage, listFreightRateRequest]);

	return {
		data,
		loading,
		listFreightRateRequest,
	};
};
export default useListFreightRateRequest;
