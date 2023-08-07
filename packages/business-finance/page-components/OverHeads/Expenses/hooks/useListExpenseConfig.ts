import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const formatedDate = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	formatType : 'dateTime',
	separator  : 'T',
});

const useListExpenseConfig = ({ expenseFilters, sort }) => {
	const { createdDateSortBy, amountSortBy } = sort || {};
	const {
		paymentStatus,
		expenseCategory,
		repeatsEvery,
		searchValue,
		pageSize,
		pageIndex,
		uploadDate,
		dueDate,
		billDate,
	} = expenseFilters || {};
	const { startDate, endDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } =		uploadDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = billDate || {};

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
					repeatFrequency    : repeatsEvery || undefined,
					paymentStatus      : paymentStatus || undefined,
					category           : expenseCategory || undefined,
					q                  : searchValue || undefined,
					createdDateSortBy  : createdDateSortBy || undefined,
					amountSortBy       : amountSortBy || undefined,
					pageSize,
					pageIndex,
					startDate          : startDate ? formatedDate(startDate) : undefined,
					endDate            : endDate ? formatedDate(endDate) : undefined,
					fromUploadBillDate : fromUploadBillDate ? formatedDate(fromUploadBillDate) : undefined,
					toUploadBillDate   : toUploadBillDate ? formatedDate(toUploadBillDate) : undefined,
					fromBillDate       : fromBillDate ? formatedDate(fromBillDate) : undefined,
					toBillDate         : toBillDate ? formatedDate(toBillDate) : undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [
		trigger,
		repeatsEvery,
		paymentStatus,
		expenseCategory,
		searchValue,
		pageIndex,
		createdDateSortBy,
		amountSortBy,
		pageSize,
		startDate,
		endDate,
		fromUploadBillDate,
		toUploadBillDate,
		fromBillDate,
		toBillDate,
	]);

	return {
		getRecurringList,
		recurringListData    : data,
		recurringListLoading : loading,
	};
};

export default useListExpenseConfig;
