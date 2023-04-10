import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface DateInterface {
	startDate?:Date
	endDate?:Date
}
interface GlobalInterface {
	serviceType?:string[],
	date?: DateInterface
}
interface Props {
	globalFilters?:GlobalInterface;
	entityTabFilters?:string
}
const useGetPayablesList = ({ globalFilters, entityTabFilters }:Props) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-receivable-payable',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_receivable_payable',
		},
		{ manual: true, autoCancel: false },
	);
	const { startDate, endDate } = globalFilters?.date || {};
	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						entityCode   : entityTabFilters === 'all' ? ['101', '301'] : entityTabFilters,
						serviceTypes : globalFilters?.serviceType,
						accountMode  : 'AP',
						startDate    : startDate ? format(startDate as Date, 'yyyy-MM-dd', {}, false)
							: undefined,
						endDate: endDate
							? format(endDate as Date, 'yyyy-MM-dd', {}, false) : undefined,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.serviceType, trigger, endDate, startDate, entityTabFilters]);

	return {
		payablesData    : data,
		payablesLoading : loading,
	};
};

export default useGetPayablesList;
