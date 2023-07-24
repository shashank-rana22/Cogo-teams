import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetAdvPaymentInvoiceList = ({ activePayrunTab, globalFilters, query, sort }) => {
	const { pageIndex, pageSize, createdAt } = globalFilters || {};

	const [{ data: advancePaymentInvoiceList, loading: advancePaymentInvoiceLoading }, trigger] = useRequestBf({
		url     : 'purchase/payrun/advance-doc-list-view',
		method  : 'get',
		authKey : 'get_purchase_advance_list_view',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(createdAt);

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
