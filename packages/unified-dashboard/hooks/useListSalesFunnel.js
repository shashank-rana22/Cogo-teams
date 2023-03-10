import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useListSalesFunnelData = (salesFunnelInViewport) => {
	const [range, setRange] = useState('current_month');
	const [filters, setFilters] = useState({
		...getDefaultFilters(range),
		show_my_zone: false,
	});
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, response }, trigger] = useRequest({
		url    : 'get_sales_funnel',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchSalesFunnelData = async () => {
		try {
			const res = await trigger({
				params: filters,
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();
			return data;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		if (Object.keys(filters).length > 0 && salesFunnelInViewport) {
			fetchSalesFunnelData();
		}
	}, [filters, salesFunnelInViewport]);

	return {
		loading,
		response,
		salesFunnel: data,
		setFilters,
		filters,
		setRange,
		range,
	};
};

export default useListSalesFunnelData;
