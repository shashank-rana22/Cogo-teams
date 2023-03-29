import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface GlobalInterface {
	serviceType?:string[],
	date?:Date,
}
interface Props {
	globalFilters?:GlobalInterface;
	yearFilters?:string[];
}
const useGetIncomeExpense = ({ globalFilters, yearFilters }:Props) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-income-expense',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_income_expense',
		},
		{ manual: true },
	);

	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						calenderYear     : yearFilters.length === 1 ? yearFilters[0] : undefined,
						financeYearStart : yearFilters.length === 2 ? yearFilters[0] : undefined,
						financeYearEnd   : yearFilters.length === 2 ? yearFilters[1] : undefined,
						serviceType      : globalFilters?.serviceType,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.serviceType, yearFilters, trigger]);

	return {
		incomeExpenseLoading : loading,
		incomeExpenseData    : data,
	};
};

export default useGetIncomeExpense;
