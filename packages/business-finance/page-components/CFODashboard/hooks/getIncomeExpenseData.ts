/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetIncomeExpense = ({ globalFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-income-expense',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_income_expense',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
					serviceType: globalFilters?.serviceType,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [globalFilters?.serviceType]);

	return {
		incomeExpenseLoading : loading,
		incomeExpenseData    : data,
		refetch,

	};
};

export default useGetIncomeExpense;
