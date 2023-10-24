import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const graphLineColors = {
	spot_search_stats : { color: '#EE3425' },
	checkout_stats    : { color: '#ABCD62' },
	shipment_stats    : { color: '#2a9df4' },
};

function useGetServiceWiseBookingInsights({ activeService = '' }) {
	const getThirtyDaysAgoDate = () => {
		const currentDate = new Date();
		const pastDate = new Date();
		pastDate.setDate(currentDate.getDate() - 30);
		return pastDate;
	};

	const [dateRange, setDateRange] = useState({
		endDate   : new Date(),
		startDate : getThirtyDaysAgoDate(),
	});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_service_wise_booking_insights',
		method : 'GET',
		params : {
			service   : activeService,
			from_date : dateRange?.startDate || undefined,
			to_date   : dateRange?.endDate || undefined,
		},
	}, {
		manual: false,
	});

	const getServiceWiseBookingInsights = useCallback(async () => {
		try {
			const params = {
				service   : activeService,
				from_date : dateRange?.startDate || undefined,
				to_date   : dateRange?.endDate || undefined,
			};

			await trigger({
				params,
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [activeService, dateRange?.endDate, dateRange?.startDate, trigger]);

	useEffect(() => {
		getServiceWiseBookingInsights();
	}, [dateRange, getServiceWiseBookingInsights]);

	const { startDate = '', endDate = '' } = dateRange || {};

	let datesArray = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		datesArray.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	datesArray = (datesArray || []).map((item) => formatDate({
		date       : item,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		separator  : ', ',
		formatType : 'date',
	}));

	const chartData = (Object.keys(data || {}) || []).map((item) => {
		const dateWiseData = data[item];

		return {
			id    : item,
			key   : item,
			color : graphLineColors[item].color,
			data  : (datesArray || []).map((dataPoint) => {
				const found = dateWiseData.find((elem) => elem.date === dataPoint);
				return {
					x : dataPoint,
					y : found?.count || 0,
				};
			}),
		};
	});

	const tickValuesForBottomAxis =		datesArray?.length > 10 ? Math.ceil(datesArray.length / 10) : 1;

	return {
		data,
		loading,
		dateRange,
		setDateRange,
		chartData,
		datesArray,
		graphLineColors,
		tickValuesForBottomAxis,
	};
}

export default useGetServiceWiseBookingInsights;
