import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useListExpenseConfig = ({ expenseFilters, sort }) => {
	const { createdDateSortBy, amountSortBy } = sort || {};
	const { branch, expenseCategory, repeatsEvery, searchValue, pageSize, pageIndex } = expenseFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list-expense-configurations',
			method  : 'get',
			authKey : 'get_purchase_expense_list_expense_configurations',
		},
		{ manual: true },
	);

	const getRecurringList = useCallback(async () => {
		try {
			await trigger({
				params: {
					repeatFrequency   : repeatsEvery || undefined,
					branchId          : branch || undefined,
					category          : expenseCategory || undefined,
					q                 : searchValue || undefined,
					createdDateSortBy : createdDateSortBy || undefined,
					amountSortBy      : amountSortBy || undefined,
					pageSize,
					pageIndex,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger,
		repeatsEvery,
		branch,
		expenseCategory,
		searchValue,
		pageIndex,
		createdDateSortBy,
		amountSortBy,
		pageSize,
	]);

	return {
		getRecurringList,
		recurringListData    : data,
		recurringListLoading : loading,
	};
};

export default useListExpenseConfig;
