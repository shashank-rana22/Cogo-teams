import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface DateInterface {
	startDate?:Date
	endDate?:Date
}
interface FilterInterface {
	serviceType?:string
	timePeriod?:string
	dateRange?:DateInterface
	rest?:any
}
const useGetDashboardData = (filters :FilterInterface) => {
	const { serviceType = '', dateRange, timePeriod } = filters || {};

	const [{ data:dashboardData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/daily-invoices-trend',
			method  : 'get',
			authKey : 'get_purchase_bills_daily_invoices_trend',
		},
		{ autoCancel: false },
	);

	const { startDate, endDate } = dateRange || {};

	const billDatesStart = 			formatDate({
		date       : startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});

	const billDatesEnd = 	formatDate({
		date       : endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});
	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						service    : serviceType || undefined,
						// fromDate   : billDatesStart || undefined,
						// toDate     : billDatesEnd || undefined,
						timePeriod : timePeriod || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	}, [trigger, billDatesEnd, billDatesStart, serviceType, timePeriod]);

	return { dashboardData, loading };
};

export default useGetDashboardData;
