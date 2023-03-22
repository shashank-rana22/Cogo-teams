import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

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

	const getProfitability = useCallback(
		async () => {
			const { job_status, ...rest } = filters;
			if (isInViewport) {
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
			}
		},
		[isInViewport, trigger, query, filters],
	);

	useEffect(() => {
		getProfitability();
	}, [getProfitability]);

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
