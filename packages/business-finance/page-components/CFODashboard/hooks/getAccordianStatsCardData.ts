import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetAccordianStatsData = ({ globalFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-service-wise-overdue',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_service_wise_overdue',
		},
		{ manual: true },
	);
	const { startDate, endDate } = globalFilters?.date || {};
	const refetch = (serviceName, tradeType) => {
		const servicemapping = {
			Ocean   : 'ocean',
			Surface : 'surface',
			Air     : 'air',
		};
		const tradeTypeMapping = () => {
			if (tradeType === 'overall') return undefined;
			return tradeType;
		};

		try {
			trigger({
				params: {
					startDate: startDate ? format(startDate as Date, 'yyyy-MM-dd', {}, false)
						: undefined,
					endDate: endDate
						? format(endDate as Date, 'yyyy-MM-dd', {}, false) : undefined,
					interfaceType : servicemapping[serviceName] || undefined,
					tradeType     : tradeTypeMapping(),
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	// useEffect(() => {
	// 	refetch();
	// }, []);

	return {
		accordianStatsLoading : loading,
		accordianStatsData    : data,
		refetch,

	};
};

export default useGetAccordianStatsData;
