/* eslint-disable react-hooks/exhaustive-deps */
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useGetProfitability = (isInViewport) => {
	const [range, setRange] = useState('current_month');
	const { query = '', debounceQuery } = useDebounceQuery();
	const [shipmentData, setShipmentData] = useState({});
	const [filters, setFilters] = useState({
		// start_date : '2023-02-11',
		// end_date   : '2023-02-18',
		...getDefaultFilters(range),
		page: 1,
	});

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_profits',
		method : 'GET',
	}, { manual: true });

	const { q: search, ...restData } = filters || {};

	const { job_status, q, ...rest } = filters;

	const getProfitabilityData = async () => {
		try {
			const resp = await trigger({
				params: {
					filters: {
						job_status,
						q: query,
					},
					...rest,
				},
			});
			setShipmentData(resp.data);
		} catch (e) {
			// console.log(e);
		}
	};

	console.log('loading', loading);

	useEffect(() => {
		if (isInViewport) {
			getProfitabilityData();
		}
	}, [JSON.stringify(restData), isInViewport, JSON.stringify(query)]);

	console.log('laodddingg', loading);

	return {
		loading,
		data: shipmentData,
		setFilters,
		setRange,
		range,
		filters,
		debounceQuery,
	};
};

export default useGetProfitability;
