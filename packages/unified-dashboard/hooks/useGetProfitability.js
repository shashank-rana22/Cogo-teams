/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useGetProfitability = () => {
	const [range, setRange] = useState('current_month');
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

	const { job_status, ...rest } = filters;

	const getProfitabilityData = async () => {
		try {
			const resp = await trigger({
				params: {
					filters: {
						job_status,
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
		// if (isInViewport) {
		getProfitabilityData();
		// }
	}, [filters]);

	console.log('laodddingg', loading);

	return {
		loading,
		data: shipmentData,
		setFilters,
		setRange,
		range,
		filters,
	};
};

export default useGetProfitability;
