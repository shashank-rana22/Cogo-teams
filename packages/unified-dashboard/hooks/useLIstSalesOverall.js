import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useListSalesOverallData = (salesCompInViewport) => {
	const [range, setRange] = useState('current_month');
	const [filters, setFilters] = useState({
		...getDefaultFilters(range),
		show_my_zone: false,
	});
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, response }, trigger] = useRequest({
		url    : 'get_sales_funnel_custom',
		method : 'GET',
		scope,
	}, { manual: true });

	const fetchSalesOverallData = useCallback(
		async () => {
			try {
				await trigger({
					params: filters,
				});
			} catch (err) {
				console.log(err, 'err');
			}
		},
		[filters, trigger],
	);

	useEffect(() => {
		if (Object.keys(filters)?.length > 0 && salesCompInViewport) {
			fetchSalesOverallData();
		}
	}, [fetchSalesOverallData, filters, salesCompInViewport]);

	return {
		loading,
		response,
		salesOverall: data,
		setFilters,
		filters,
		setRange,
		range,
	};
};

export default useListSalesOverallData;
