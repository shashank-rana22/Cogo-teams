import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Filters {
	branch?:string | number,
	expenseCategory?:string,
	searchValue?:string,
}
interface Filter {
	expenseFilters?:Filters,
	id?:string,
	expenseType?:string,
}

const useListExpense = ({ expenseFilters, id, expenseType }:Filter) => {
	const { branch, expenseCategory, searchValue } = expenseFilters || {};

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
					expenseType            : expenseType || 'NON_RECURRING',
					branchId               : branch || undefined,
					category               : expenseCategory || undefined,
					q                      : searchValue || undefined,
					expenseConfigurationId : id || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, expenseType, branch, expenseCategory, searchValue, id]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
