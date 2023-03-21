import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetInvoiceAmount = () => {
	// const [filters, setFilters] = useState({});

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/paybles-info',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/payables-info',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {},
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

export default useGetInvoiceAmount;
