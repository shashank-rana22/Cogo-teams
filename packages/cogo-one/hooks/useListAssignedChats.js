import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const getParams = ({ value }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		start_date : new Date(),
		end_date   : DATE_FILTER_MAPPING[value](new Date()),
	},
});

const useListAssignedChats = ({ value }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ value }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, value]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		statsData    : data,
		statsLoading : loading,
	};
};

export default useListAssignedChats;
