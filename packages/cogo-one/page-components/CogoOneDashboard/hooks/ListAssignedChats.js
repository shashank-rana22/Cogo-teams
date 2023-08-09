import { useRequest } from '@cogoport/request';
import { startOfDay, startOfWeek, startOfMonth } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const DATE_FILTER_MAPPING = {
	day   : startOfDay,
	week  : startOfWeek,
	month : startOfMonth,

};

const getParams = ({ timeline, agentId }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		sales_agent_id          : agentId || undefined,
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[timeline](new Date()),
	},
});

const useListAssignedChats = ({ timeline = '', agentId = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline, agentId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, timeline, agentId]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		data,
		loading,
	};
};

export default useListAssignedChats;
