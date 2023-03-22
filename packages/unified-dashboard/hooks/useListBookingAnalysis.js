import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

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

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_booking_analysis',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		setParams((prev) => ({ ...prev, entity_code }));
	}, [entity_code]);

	// const fetchBookingAnalysisData = async () => {
	// 	try {
	// 		await trigger({
	// 			params: {
	// 				...params,
	// 				entity_code: entity_code.length > 0 ? entity_code : undefined,
	// 			},
	// 		});
	// 	} catch (err) {
	// 		console.log(err, 'err');
	// 	}
	// };

	const fetchBookingAnalysisData = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						...params,
						entity_code: entity_code.length > 0 ? entity_code : undefined,
					},
				});
			} catch (err) {
				console.log(err, 'err');
			}
		},
		[params, entity_code, trigger],
	);

	useEffect(() => {
		console.log('im here');
		fetchBookingAnalysisData();
	}, [fetchBookingAnalysisData]);

	return {
		loading,
		bookingAnalysis: data,
		setParams,
		params,
		selectedFilterTab,
		setSelectedFilterTab,
	};
};

export default useGetBookingAnalysis;
