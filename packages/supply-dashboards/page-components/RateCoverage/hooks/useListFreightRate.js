import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const api = {
	fcl_freight : 'list_fcl_freight_rates',
	lcl_freight : 'list_lcl_freight_rates',
	air_freight : 'list_air_freight_rates',
};

const useListFreightRate = ({ filter, currentPage }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : api[filter.service],
		method : 'GET',
	}, { manual: true });

	const listFreightRate = useCallback(async () => {
		const finalFilter = Object.fromEntries(
			Object.entries(filter).filter(([, value]) => value !== ''),
		);
		try {
			await trigger({
				params: {
					filters: {
						status                  : 'active',
						is_rate_about_to_expire : true,
						...finalFilter,
					},
					page: currentPage,
				},
			});
		} catch (err) {
			console.log(err);
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
