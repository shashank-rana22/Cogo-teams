import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useGetProfitability = (isInViewport) => {
	const [range, setRange] = useState('current_month');
	const { query = '', debounceQuery } = useDebounceQuery();
	const [shipmentData, setShipmentData] = useState({});
	const [filters, setFilters] = useState({
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
			console.log(e, 'err');
		}
	};

	useEffect(() => {
		if (isInViewport) {
			getProfitabilityData();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(restData), isInViewport, JSON.stringify(query)]);

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
