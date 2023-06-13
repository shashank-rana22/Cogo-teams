import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const DEFAULT_PAGE_NUMBER = 1;

const useListCogopointTopHistory = ({
	transactionType = '',
	selectedDate = {},
	activeStatsCard = '',
	activeHeaderTab = '',
	currencyCode = '',
}) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);
	const { startDate, endDate } = selectedDate || {};

	const listCogopointTopHistory = useCallback(() => {
		trigger({
			params: {
				credit_cogopoint_date_data_required : true,
				page                                : pagination,
				currency                            : currencyCode,
				filters                             : {
					transaction_type  : transactionType,
					organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
					from_date         : startDate || undefined,
					to_date           : endDate || undefined,
				},
			},
		});
	}, [trigger, transactionType, pagination, startDate, endDate, activeHeaderTab, currencyCode]);

	useEffect(() => {
		listCogopointTopHistory();
	}, [listCogopointTopHistory, activeStatsCard]);

	return {
		topHistoryData    : data,
		topHistoryLoading : loading,
		setPagination,
	};
};

export default useListCogopointTopHistory;
