import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

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
	const getPayrunListView = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex,
						pageSize,
						state             : activePayrunTab,
						q                 : query !== '' ? query : undefined,
						startDate         : selectFromDate || undefined,
						endDate           : selectToDate || undefined,
						dueDateSortType   : 'asc',
						createdAtSortType : 'desc',
						...sort,
					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		}

		)();
	}, [trigger, pageIndex, pageSize, activePayrunTab, query, selectFromDate, selectToDate, sort]);

	return {
		getPayrunListView,
		billListViewData    : data,
		billListViewLoading : loading,
	};
};

export default useGetPayrunBillListView;
