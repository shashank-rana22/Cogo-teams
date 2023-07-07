import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const GET_ZERO_INDEX = 0;
const useDashboard = (year, lastThreeFinancialYears) => {
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
					startYear: year || lastThreeFinancialYears?.[GET_ZERO_INDEX]?.value || undefined,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [lastThreeFinancialYears, trigger, year]);

	useEffect(() => { refetch(); }, [refetch]);

	return {
		data,
		loading,
	};
};
export default useDashboard;
