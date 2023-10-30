import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useContext, useCallback } from 'react';

import { EntityContext } from '../../commons/Contexts';

const formatedDate = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	formatType : 'dateTime',
	separator  : 'T',
});

const useListExpense = ({
	expenseFilters = {},
	id = '',
	expenseType = '',
	sort = {},
	subActiveTab = '',
	pageIndexVal = '',
	pageSizeVal = '',
}) => {
	const {
		paymentStatus = '',
		expenseCategory = '',
		searchValue = '',
		pageSize = 10,
		pageIndex = 1,
		uploadDate,
		dueDate,
		billDate,
	} = expenseFilters || {};
	const { startDate, endDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = uploadDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = billDate || {};
	const entity = useContext(EntityContext);
	const {
		invoiceAmountSortType,
		tdsSortType,
		payableSortType,
		paidAmountSortType,
	} = sort || {};
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
					paymentStatus          : paymentStatus || undefined,
					category               : expenseCategory || undefined,
					q                      : searchValue || undefined,
					expenseConfigurationId : id || undefined,
					status                 : subActiveTab === 'ALL_INVOICES' ? undefined : subActiveTab,
					invoiceAmountSortType  : invoiceAmountSortType || undefined,
					paidAmountSortType     : paidAmountSortType || undefined,
					payableSortType        : payableSortType || undefined,
					tdsSortType            : tdsSortType || undefined,
					pageSize               : pageSize || pageSizeVal || undefined,
					pageIndex              : pageIndex || pageIndexVal || undefined,
					startDate              : startDate ? formatedDate(startDate) : undefined,
					endDate                : endDate ? formatedDate(endDate) : undefined,
					fromUploadBillDate     : fromUploadBillDate
						? formatedDate(fromUploadBillDate)
						: undefined,
					toUploadBillDate: toUploadBillDate
						? formatedDate(toUploadBillDate)
						: undefined,
					fromBillDate: fromBillDate
						? formatedDate(fromBillDate)
						: undefined,
					toBillDate: toBillDate
						? formatedDate(toBillDate)
						: undefined,
					cogoEntityId: entity,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [
		trigger,
		subActiveTab,
		expenseType,
		paymentStatus,
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
		startDate,
		endDate,
		pageIndexVal,
		fromUploadBillDate,
		toUploadBillDate,
		fromBillDate,
		toBillDate,
		entity,
	]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
