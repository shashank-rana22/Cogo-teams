/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTodayStats = ({ globalFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-today-stats',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_today_stats',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
					serviceTypes: globalFilters?.serviceType,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [globalFilters?.serviceType]);

	return {
		todayStatsLoading : loading,
		todayStatsData    : data,
		refetch,

	};
};

export default useGetTodayStats;
