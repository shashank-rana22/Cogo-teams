import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetPayablesList = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-receivable',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_receivable',
		},
		{ manual: true, autoCancel: false },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
					accountMode: 'AP',
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
		payablesData    : data,
		payablesLoading : loading,
	};
};

export default useGetPayablesList;
