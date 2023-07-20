import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAdvPaymentInvoiceList = ({ activePayrunTab, globalFilters, query, sort }) => {
	const { pageIndex, pageSize, createdAt } = globalFilters || {};

	const [{ data:advancePaymentInvoiceList, loading:advancePaymentInvoiceLoading }, trigger] = useRequestBf({
		url     : 'purchase/payrun/advance-doc-list-view',
		method  : 'get',
		authKey : 'get_purchase_advance_list_view',
	}, { manual: true, autoCancel: false });
	const selectFromDate =		createdAt
	&& formatDate({
		date       : createdAt.startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const selectToDate =		createdAt
	&& formatDate({
		date       : createdAt.endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const getAdvancePaymentInvoiceList = useCallback(async () => {
		try {
			await trigger({
				params: {
					pageIndex,
					pageSize,
					state     : activePayrunTab,
					q         : query !== '' ? query : undefined,
					startDate : selectFromDate || undefined,
					endDate   : selectToDate || undefined,
					...sort,
				},
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [trigger, pageIndex, pageSize, activePayrunTab, query, selectFromDate, selectToDate, sort]);

	return {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList,
		advancePaymentInvoiceLoading,
	};
};

export default useGetAdvPaymentInvoiceList;
