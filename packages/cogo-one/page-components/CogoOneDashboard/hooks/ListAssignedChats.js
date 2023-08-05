import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ agentId = '', userId = '' }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		sales_agent_id    : agentId || undefined,
		sales_agent_rm_id : !agentId ? userId : undefined,
	},
});

const useListAssignedChats = ({ agentId = '' }) => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ agentId, userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, agentId, userId]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		data,
		loading,
	};
};

export default useListAssignedChats;
