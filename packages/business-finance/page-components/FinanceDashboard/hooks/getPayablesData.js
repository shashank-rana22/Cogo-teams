import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetPayablesList = ({ globalFilters, entityTabFilters }) => {
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
						entityCode   : entityTabFilters,
						serviceTypes : globalFilters?.serviceType,
						accountMode  : 'AP',
						startDate    : startDate ? format(startDate, 'yyyy-MM-dd', {}, false)
							: undefined,
						endDate: endDate
							? format(endDate, 'yyyy-MM-dd', {}, false) : undefined,
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
