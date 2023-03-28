import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Filters {
	branch?:string | number,
	expenseCategory?:string,
	searchValue?:string,
}

interface Sort {
	invoiceAmountSortType?:string,
	tdsSortType?:string,
	payableSortType?:string,
	paidAmountSortType?:string,
}
interface Filter {
	expenseFilters?:Filters,
	id?:string | number,
	expenseType?:string,
	sort?:Sort,
}

const useListExpense = ({ expenseFilters, id, expenseType, sort }:Filter) => {
	const { branch, expenseCategory, searchValue } = expenseFilters || {};
	const { invoiceAmountSortType, tdsSortType, payableSortType, paidAmountSortType } = sort || {};

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
					invoiceAmountSortType  : invoiceAmountSortType || undefined,
					paidAmountSortType     : paidAmountSortType || undefined,
					payableSortType        : payableSortType || undefined,
					tdsSortType            : tdsSortType || undefined,
					entityCodeId           : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger,
		expenseType,
		branch,
		expenseCategory,
		searchValue,
		id,
		invoiceAmountSortType,
		tdsSortType,
		payableSortType,
		paidAmountSortType]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
