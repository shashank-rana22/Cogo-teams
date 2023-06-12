import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListCogopointTopHistory = ({ transactionType = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const listCogopointTopHistory = useCallback(() => {
		trigger({
			params: {
				transaction_type                    : transactionType,
				credit_cogopoint_date_data_required : true,
			},
		});
	}, [transactionType, trigger]);

	useEffect(() => {
		listCogopointTopHistory();
	}, [listCogopointTopHistory]);

	return {
		topHistoryData    : data,
		topHistoryLoading : loading,
	};
};

export default useListCogopointTopHistory;
