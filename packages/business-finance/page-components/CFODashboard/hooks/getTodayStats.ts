/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTodayStats = () => {
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
					serviceTypes: 'FCL_FREIGHT',
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, []);

	return {
		todayStatsLoading : loading,
		todayStatsData    : data,
		refetch,

	};
};

export default useGetTodayStats;
