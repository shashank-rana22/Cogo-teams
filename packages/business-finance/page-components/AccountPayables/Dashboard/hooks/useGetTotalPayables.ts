import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface FilterProps {
	currency?: string,
	service?: string,
}
interface ItemProps {
	filtersData: FilterProps;
	activeEntity: string,
}

const useGetTotalPayables = ({ filtersData, activeEntity }:ItemProps) => {
	const {
		service,
		currency,
	} = filtersData || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/total-paybles',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_total_paybles',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						service  : service || undefined,
						currency : currency || undefined,
						entity   : activeEntity,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [service, currency, activeEntity, trigger]);

	useEffect(() => {
		getDahboardData();
	}, [service, currency, getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetTotalPayables;
