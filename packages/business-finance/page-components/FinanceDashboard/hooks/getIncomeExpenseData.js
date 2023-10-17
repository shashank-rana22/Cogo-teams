import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetIncomeExpense = ({ globalFilters, yearFilters, entityTabFilters }) => {
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
						serviceTypes     : globalFilters?.serviceType,
						entityCode       : entityTabFilters,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.serviceType, yearFilters, trigger, entityTabFilters]);

	return {
		incomeExpenseLoading : loading,
		incomeExpenseData    : data,
	};
};

export default useGetIncomeExpense;
