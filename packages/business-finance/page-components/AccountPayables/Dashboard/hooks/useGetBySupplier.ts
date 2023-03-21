import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetBySupplier = () => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : 'payments/outstanding/by-supplier',
			method  : 'get',
			authKey : 'get_payments_outstanding_by_supplier',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					sortBy   : 'totalOutstandingInvoiceLedgerAmount',
					sortType : 'Desc',
				},
			});
		} catch (err) {
			console.log(err);
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

export default useGetBySupplier;
