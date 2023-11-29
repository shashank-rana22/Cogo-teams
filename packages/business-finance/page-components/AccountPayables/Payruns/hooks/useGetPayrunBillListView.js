import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const getListofInvoicePayload = ({
	pageIndex, pageSize,
	activePayrunTab, query,
	overseasData,
	selectFromDate, selectToDate,
	sort,
	activeEntity = '',
}) => (
	{
		pageIndex,
		pageSize,
		state             : activePayrunTab,
		q                 : isEmpty(query) ? query : undefined,
		type              : overseasData,
		startDate         : selectFromDate || undefined,
		endDate           : selectToDate || undefined,
		dueDateSortType   : 'asc',
		createdAtSortType : 'desc',
		...sort,
		entityCode        : activeEntity,
	});

const useGetPayrunBillListView = ({ activePayrunTab, query, sort, globalFilters, overseasData = 'NORMAL' }) => {
	const { pageIndex, pageSize, createdAt, activeEntity = '' } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/bill-list-view',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_list_view',
		},
		{ manual: true, autoCancel: false },
	);
	const { selectFromDate, selectToDate } = dateFormatter(createdAt);

	const getPayrunListView = useCallback(() => {
		const payload = getListofInvoicePayload({
			pageIndex,
			pageSize,
			activePayrunTab,
			query,
			overseasData,
			selectFromDate,
			selectToDate,
			sort,
			activeEntity,
		});

		try {
			trigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [pageIndex, pageSize, activePayrunTab, query,
		overseasData, selectFromDate, selectToDate, sort, activeEntity, trigger]);

	return {
		getPayrunListView,
		billListViewData    : data,
		billListViewLoading : loading,
	};
};

export default useGetPayrunBillListView;
