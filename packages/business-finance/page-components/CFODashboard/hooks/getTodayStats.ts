import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface GlobalInterface {
	serviceType?:string[],
	date?:Date,
}
interface Props {
	globalFilters?:GlobalInterface;
}
const useGetTodayStats = ({ globalFilters }:Props) => {
	const { serviceType } = globalFilters || {};
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-today-stats',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_today_stats',
		},
		{ manual: true },
	);

	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						serviceTypes: serviceType,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [serviceType, trigger]);

	return {
		todayStatsLoading : loading,
		todayStatsData    : data,

	};
};

export default useGetTodayStats;
