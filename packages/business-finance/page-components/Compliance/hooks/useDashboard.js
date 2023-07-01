import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

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
			toastApiError(error);
		}
	}, [trigger, year]);

	useEffect(() => { refetch(); }, [refetch]);

	return {
		data,
		loading,
	};
};
export default useDashboard;
