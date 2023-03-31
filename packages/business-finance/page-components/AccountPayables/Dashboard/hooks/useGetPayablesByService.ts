import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetPayablesByService = () => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/paybles-by-service',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_paybles_by_service',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetPayablesByService;
