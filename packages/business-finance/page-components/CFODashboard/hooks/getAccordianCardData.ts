import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetAccordianCardData = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-service-wise-rec-pay',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_service_wise_rec_pay',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
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
		accordianDataLoading : loading,
		accordianDataData    : data,
		refetch,

	};
};

export default useGetAccordianCardData;
