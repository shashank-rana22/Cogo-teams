import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetInvoiceAmount = ({ activeTab }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/paybles-info',
			method  : 'get',
			authKey : 'get_payments_outstanding_payables-info',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					entity: activeTab,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetInvoiceAmount;
