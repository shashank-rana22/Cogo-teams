import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetPricingTrends = () => {
	const [filters, setFilters] = useState({ page: 1 });
	const { page, ...restFilters } = filters;
	const finalFilters = {};
	Object.keys(restFilters).forEach((key) => {
		if (restFilters[key]) {
			finalFilters[key] = restFilters[key];
		}
	});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_estimations',
		method : 'GET',
		params : {
			filters    : finalFilters,
			page,
			page_limit : 10,
		},

	}, { manual: true });

	const getData = async () => {
		await trigger();
	};

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);
	return {
		loading,
		data,
		setFilters,
		filters,
		page,
	};
};

export default useGetPricingTrends;
