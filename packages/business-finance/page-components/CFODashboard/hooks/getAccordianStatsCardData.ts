import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetAccordianStatsData = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard//bf-service-wise-overdue',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_service_wise_overdue',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
					interfaceType: 'ocean',
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
		accordianStatsLoading : loading,
		accordianStatsData    : data,
		refetch,

	};
};

export default useGetAccordianStatsData;
