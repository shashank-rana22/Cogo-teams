import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListCogopointTopHistory = ({ transactionType = '', selectedDate = {}, activeStatsCard = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const [pagination, setPagination] = useState(1);
	const { startDate, endDate } = selectedDate || {};

	const listCogopointTopHistory = useCallback(() => {
		trigger({
			params: {
				transaction_type                    : transactionType,
				credit_cogopoint_date_data_required : true,
				page                                : pagination,
				filters                             : {
					from_date : startDate,
					to_date   : endDate,
				},
			},
		});
	}, [trigger, transactionType, pagination, startDate, endDate]);

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
