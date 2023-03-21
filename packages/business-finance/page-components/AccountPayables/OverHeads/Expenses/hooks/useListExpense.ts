import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Filter {
	expenseCategory?:string,
}

const useListExpense = (expenseFilters:Filter) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list',
			method  : 'get',
			authKey : 'get_expense_list',
		},
		{ manual: true },
	);

	const getList = useCallback(async () => {
		try {
			await trigger({
				params: {
					expenseType     : 'NON_RECURRING',
					expenseCategory : expenseFilters?.expenseCategory || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, expenseFilters?.expenseCategory]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
