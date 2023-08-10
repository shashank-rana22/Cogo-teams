import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

interface MonthlyStatsInterface {
	month?:string
	year?:string
	entityCode?:string
}
const useMonthlyTrendStats = ({ month, year, entityCode }:MonthlyStatsInterface) => {
	const [
		{ data:monthlyData, loading:monthlyLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/pnl/dashboard/monthly-trends',
			method  : 'get',
			authKey : 'get_pnl_dashboard_monthly_trends',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					Year       : year || undefined,
					Month      : month || undefined,
					entityCode : entityCode || undefined,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [entityCode, month, trigger, year]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		monthlyData,
		monthlyLoading,
	};
};
export default useMonthlyTrendStats;
