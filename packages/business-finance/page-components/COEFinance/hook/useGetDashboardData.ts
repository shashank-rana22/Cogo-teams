import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

interface FilterInterface {
	serviceType?:string
	timePeriod?:string
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
				toastApiError(err);
			}
		};
		getData();
	}, [trigger, serviceType, timePeriod]);

	return { dashboardData, loading };
};

export default useGetDashboardData;
