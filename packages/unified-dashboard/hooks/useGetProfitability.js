import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useGetProfitability = (isInViewport = true) => {
	const [range, setRange] = useState('current_month');
	const [filters, setFilters] = useState({
		// start_date : '2023-02-11',
		// end_date   : '2023-02-18',
		...getDefaultFilters(range),
		page: 1,
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_profits',
		method : 'GET',
	}, { manual: false });

	const getProfitabilityData = async () => {
		const { job_status, ...rest } = filters;
		await trigger({
			params: {
				filters: {
					job_status,
				},
				...rest,
			},
		});
	};

	useEffect(() => {
		if (isInViewport) {
			getProfitabilityData();
		}
	}, [filters, isInViewport]);

	return {
		loading,
		data,
		setFilters,
		setRange,
		range,
		filters,
	};
};

export default useGetProfitability;
