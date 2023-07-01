import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface ItemProps {
	activeEntity: string;
}
const useGetAgePayable = ({ activeEntity }:ItemProps) => {
	const [filters, setFilters] = useState({
		service  : undefined,
		currency : undefined,
	});

	const {
		service,
		currency,
	} = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/age-payable',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_age_payable',
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
				Toast.error(err.meessage);
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
		filters,
		setFilters,
	};
};

export default useGetAgePayable;
