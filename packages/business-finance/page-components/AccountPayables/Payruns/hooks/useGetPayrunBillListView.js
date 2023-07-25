import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetPayrunBillListView = ({ activePayrunTab, query, sort, globalFilters }) => {
	const { pageIndex, pageSize, createdAt } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/bill-list-view',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_list_view',
		},
		{ manual: true, autoCancel: false },
	);

	const { selectFromDate, selectToDate } = dateFormatter(createdAt);

	const getListofInvoicePayload = useCallback(() => ({
		pageIndex,
		pageSize,
		state             : activePayrunTab,
		q                 : query !== '' ? query : undefined,
		startDate         : selectFromDate || undefined,
		endDate           : selectToDate || undefined,
		dueDateSortType   : 'asc',
		createdAtSortType : 'desc',
		...sort,
	}), [activePayrunTab, pageIndex, pageSize, query, selectFromDate, selectToDate, sort]);

	const getPayrunListView = useCallback(() => {
		const getPayload = getListofInvoicePayload();

		try {
			trigger({
				params: getPayload,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [getListofInvoicePayload, trigger]);

	return {
		getPayrunListView,
		billListViewData    : data,
		billListViewLoading : loading,
	};
};

export default useGetPayrunBillListView;
