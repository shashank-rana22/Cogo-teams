import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface FilterProps {
	showVendorsList:string,
}

const useGetBySupplier = ({ showVendorsList }:FilterProps) => {
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
					sortBy   : 'openInvoiceLedgerAmount',
					sortType : 'Desc',
					category : showVendorsList || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showVendorsList]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetBySupplier;
