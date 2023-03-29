import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useListExpenseConfig = ({ expenseFilters, sort }) => {
	const { createdDateSortBy, amountSortBy } = sort || {};
	const { branch, expenseCategory, repeatsEvery, searchValue, pageSize, pageIndex } = expenseFilters || {};

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
					repeatFrequency   : repeatsEvery || undefined,
					branchId          : branch || undefined,
					category          : expenseCategory || undefined,
					q                 : searchValue || undefined,
					createdDateSortBy : createdDateSortBy || undefined,
					amountSortBy      : amountSortBy || undefined,
					entityCodeId      : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
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
