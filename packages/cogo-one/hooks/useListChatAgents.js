import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useListChatAgents() {
	const [pagination, setPagination] = useState(1);
	const [{ loading, data: listAgentStatus }, trigger] = useRequest({
		url    : '/list_chat_agents',
		method : 'get',
	}, { manual: true });

	const getListChatAgents = useCallback(async () => {
		try {
			await trigger({
				params: { page: pagination, page_limit: 10 },
			});
		} catch (error) {
			// console.log(error);
		}
	}, [trigger, pagination]);

	useEffect(() => {
		getListChatAgents();
	}, [getListChatAgents]);

	return {
		loading,
		listAgentStatus,
		setPagination,
		getListChatAgents,
	};
}
export default useListChatAgents;
