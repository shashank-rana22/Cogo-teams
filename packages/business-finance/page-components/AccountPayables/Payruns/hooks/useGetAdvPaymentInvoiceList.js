import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const getAdvancePaymentInvoicePayload = ({
	pageIndex, pageSize, activePayrunTab,
	query, selectFromDate, selectToDate, sort,
}) => ({
	pageIndex,
	pageSize,
	state     : activePayrunTab,
	q         : query !== '' ? query : undefined,
	startDate : selectFromDate || undefined,
	endDate   : selectToDate || undefined,
	...sort,
});

const useGetAdvPaymentInvoiceList = ({ activePayrunTab, globalFilters, query, sort }) => {
	const { pageIndex, pageSize, createdAt } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf({
		url     : 'purchase/payrun/advance-doc-list-view',
		method  : 'get',
		authKey : 'get_purchase_advance_list_view',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(createdAt);

	const getAdvancePaymentInvoiceList = useCallback(() => {
		const payload = getAdvancePaymentInvoicePayload({
			pageIndex,
			pageSize,
			activePayrunTab,
			query,
			selectFromDate,
			selectToDate,
			sort,
		});

		try {
			trigger({
				params: payload,
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [activePayrunTab, pageIndex, pageSize, query, selectFromDate, selectToDate, sort, trigger]);

	return {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList    : data,
		advancePaymentInvoiceLoading : loading,
	};
};

export default useGetAdvPaymentInvoiceList;
