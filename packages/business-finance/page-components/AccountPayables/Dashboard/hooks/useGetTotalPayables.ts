import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface FilterProps {
	currency:string,
	service:string,
}
interface ItemProps {
	filtersData:FilterProps;
}

const useGetTotalPayables = ({ filtersData }:ItemProps) => {
	const {
		service,
		currency,
		...rest
	} = filtersData || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/total-paybles',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/total-payables',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					service  : service || undefined,
					currency : currency || undefined,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), service, currency]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetTotalPayables;
