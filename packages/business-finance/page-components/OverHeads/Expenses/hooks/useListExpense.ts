import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Filters {
	branch?:string | number,
	expenseCategory?:string,
	searchValue?:string,
	pageSize?:number,
	pageIndex?:number,
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
	pageIndexVal?:number,
	pageSizeVal?:number,
}

const useListExpense = ({ expenseFilters, id, expenseType, sort, pageIndexVal, pageSizeVal }:Filter) => {
	const { branch, expenseCategory, searchValue, pageSize, pageIndex } = expenseFilters || {};
	const { invoiceAmountSortType, tdsSortType, payableSortType, paidAmountSortType } = sort || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list',
			method  : 'get',
			authKey : 'get_purchase_expense_list',
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
					pageSize               : pageSize || pageSizeVal || undefined,
					pageIndex              : pageIndex || pageIndexVal || undefined,
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
		pageSize,
		pageIndex,
		paidAmountSortType,
		pageSizeVal,
		pageIndexVal,
	]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
