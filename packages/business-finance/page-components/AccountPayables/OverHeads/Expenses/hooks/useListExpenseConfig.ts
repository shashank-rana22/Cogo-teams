import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useListExpenseConfig = ({ expenseFilters }) => {
	const { branch, expenseCategory, repeatsEvery, searchValue } = expenseFilters || {};

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
				params: {
					repeatFrequency : repeatsEvery || undefined,
					branchId        : branch || undefined,
					category        : expenseCategory || undefined,
					q               : searchValue || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, repeatsEvery, branch, expenseCategory, searchValue]);

	return {
		getRecurringList,
		recurringListData    : data,
		recurringListLoading : loading,
	};
};

export default useListExpenseConfig;
