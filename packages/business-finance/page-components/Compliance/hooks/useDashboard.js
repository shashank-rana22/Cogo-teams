import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useDashboard = (year) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/ey-authentication-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_ey_authentication_stats',
		},
		{ manual: true },
	);
	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					startYear: year || undefined,
				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [trigger, year]);

	useEffect(() => { refetch(); }, [refetch]);

	return {
		data,
		loading,
	};
};
export default useDashboard;
