import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

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
					entityCode : entityCode || Object.keys(GLOBAL_CONSTANTS.cogoport_entities)[2],
				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
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
