import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetDashboardData = () => {
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
				await trigger({});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	}, [trigger]);

	return { dashboardData, loading };
};

export default useGetDashboardData;
