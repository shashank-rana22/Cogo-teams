import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';

const useGetAccordianStatsData = ({ globalFilters, entityTabFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-service-wise-overdue',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_service_wise_overdue',
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
					entityCode    : entityTabFilters === 'all' ? ['101', '301'] : entityTabFilters,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	return {
		accordianStatsLoading : loading,
		accordianStatsData    : data,
		refetch,

	};
};

export default useGetAccordianStatsData;
