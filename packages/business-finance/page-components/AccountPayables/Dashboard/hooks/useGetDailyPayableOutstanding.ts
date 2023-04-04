import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface FilterProps {
	currency?: string,
	service?: string,
}
interface ItemProps {
	isQuarterView: boolean,
	filters: FilterProps,
	activeEntity: string,
}
const useGetDailyPayableOutstanding = ({ isQuarterView, filters, activeEntity }:ItemProps) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/daily-payable-outstanding',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_daily_payable_outstanding',
		},
		{ manual: true, autoCancel: false },
	);
	const {
		service,
		currency,
	} = filters || {};
	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						view     : isQuarterView ? 'quarter' : 'month',
						service  : service || undefined,
						currency : currency || undefined,
						entity   : activeEntity,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [currency, service, isQuarterView, activeEntity, trigger]);

	useEffect(() => {
		getDahboardData();
	}, [service, currency, isQuarterView, getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetDailyPayableOutstanding;
