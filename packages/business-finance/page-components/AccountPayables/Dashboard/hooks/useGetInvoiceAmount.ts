import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetInvoiceAmount = () => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/paybles-info',
			method  : 'get',
			authKey : 'get_payments_outstanding_paybles_info',
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

export default useGetInvoiceAmount;
