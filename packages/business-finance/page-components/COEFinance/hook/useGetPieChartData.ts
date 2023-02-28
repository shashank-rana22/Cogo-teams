import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetPieChartData = () => {
	const [{ data:pieData, loading }, trigger] = useRequestBf(
		{
			url    : '/purchase/bills/bill-rejection-stats',
			method : 'get',
			// authKey : 'get_payments_accounts_org_stats',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({});
			} catch (err) {
				Toast.error(err);
			}
		};
		getData();
	}, [trigger]);

	return { pieData, loading };
};

export default useGetPieChartData;
