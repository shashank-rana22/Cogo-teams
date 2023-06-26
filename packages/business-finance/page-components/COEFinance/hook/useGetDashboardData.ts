import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface DateInterface {
	startDate?:Date
	endDate?:Date
}
interface FilterInterface {
	zone?:string
	serviceType?:string
	timePeriod?:string
	dateRange?:DateInterface
	rest?:any
}
const useGetDashboardData = (filters :FilterInterface) => {
	const { zone = '', serviceType = '', dateRange, timePeriod } = filters || {};

	const [{ data:dashboardData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/daily-invoices-trend',
			method  : 'get',
			authKey : 'get_purchase_bills_daily_invoices_trend',
		},
		{ autoCancel: false },
	);

	const billDatesStart = (dateRange?.startDate === undefined
		|| dateRange?.startDate === null)
		? null : format(dateRange?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const billDatesEnd = (dateRange?.startDate === undefined
            || dateRange?.startDate === null)
		? null : format(dateRange?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						service    : serviceType || undefined,
						fromDate   : billDatesStart || undefined,
						toDate     : billDatesEnd || undefined,
						timePeriod : timePeriod || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	}, [trigger, billDatesEnd, billDatesStart, serviceType, timePeriod, zone]);

	return { dashboardData, loading };
};

export default useGetDashboardData;
