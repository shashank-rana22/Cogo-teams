import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { serviceTypeArr, tradeTypeArr } from '../constants/checkbox-data';

const getCheckBoxValues = (arr) => arr.map((val) => val.value);

const useGetBookingAnalysis = (headerFilters) => {
	const { entity_code = [] } = headerFilters;

	const [selectedFilterTab, setSelectedFilterTab] = useState('month');

	const [params, setParams] = useState({
		shipment_type      : getCheckBoxValues(serviceTypeArr),
		trade_type         : getCheckBoxValues(tradeTypeArr),
		is_amount_in_rupee : false,
		period_type        : selectedFilterTab,
	});
	const [bookingAnalysis, setBookingAnalysis] = useState(null);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_booking_analysis',
		method : 'GET',
	}, { manual: false });

	// const { loading, data, trigger } = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/list_booking_analysis');

	const fetchBookingAnalysisData = async () => {
		try {
			const res = await trigger({
				params: {
					...params,
					entity_code: entity_code.length > 0 ? entity_code : undefined,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();
			if (res?.data?.months_considered) {
				setBookingAnalysis(res?.data);
			}

			return data;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		fetchBookingAnalysisData();
	}, [JSON.stringify(params), JSON.stringify(entity_code)]);

	return {
		loading,
		bookingAnalysis,
		setParams,
		params,
		selectedFilterTab,
		setSelectedFilterTab,
	};
};

export default useGetBookingAnalysis;
