import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

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
	const [{ data:gstr1Data, loading:loadingGstr1 }, triggerGstr1] = useRequestBf(
		{
			url     : '/sales/outward/gstr1-stats',
			method  : 'get',
			authKey : 'get_sales_outward_gstr1_stats',
		},
		{ manual: true },
	);
	const gstr1Refetch = useCallback(async () => {
		try {
			await triggerGstr1({});
		} catch (error) {
			toastApiError(error);
		}
	}, [triggerGstr1]);

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

	useEffect(() => { refetch(); gstr1Refetch(); }, [gstr1Refetch, refetch]);

	return {
		data,
		loading,
		gstr1Data,
		loadingGstr1,
	};
};
export default useDashboard;
