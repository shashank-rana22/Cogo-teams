import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface GlobalInterface {
	serviceType?:string[],
	date?:Date,
}
interface Props {
	globalFilters?:GlobalInterface;
}
const useGetPayablesList = ({ globalFilters }:Props) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-receivable-payable',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_receivable_payable',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						serviceType : globalFilters?.serviceType,
						accountMode : 'AP',
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.serviceType, trigger]);

	return {
		payablesData    : data,
		payablesLoading : loading,
	};
};

export default useGetPayablesList;
