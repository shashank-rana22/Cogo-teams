import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ agentId = '' }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		agent_id: agentId,
	},
});

const useListAssignedChats = ({ agentId = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ agentId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, agentId]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		data,
		loading,
	};
};

export default useListAssignedChats;
