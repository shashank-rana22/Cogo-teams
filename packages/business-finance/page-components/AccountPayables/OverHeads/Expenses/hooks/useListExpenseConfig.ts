import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

// interface Filter {
// 	expenseCategory?:string,
// }

const useListExpenseConfig = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list-expense-configurations',
			method  : 'get',
			authKey : 'list-expense-configurations',
		},
		{ manual: true },
	);

	const getRecurringList = useCallback(async () => {
		try {
			await trigger({
				// params: {
				// 	expenseType     : 'NON_RECURRING',
				// 	expenseCategory : expenseFilters?.expenseCategory || undefined,
				// },
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	return {
		getRecurringList,
		recurringListData    : data,
		recurringListLoading : loading,
	};
};

export default useListExpenseConfig;
