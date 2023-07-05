import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface FilterInterface {
	serviceType?:string
	timePeriod?:string
	rest?:any
}
const useGetDashboardData = (filters :FilterInterface) => {
	const { serviceType = '', timePeriod } = filters || {};

	const [{ data:dashboardData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/daily-invoices-trend',
			method  : 'get',
			authKey : 'get_purchase_bills_daily_invoices_trend',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						service    : serviceType || undefined,
						timePeriod : timePeriod || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	}, [trigger, serviceType, timePeriod]);

	return { dashboardData, loading };
};

export default useGetDashboardData;
