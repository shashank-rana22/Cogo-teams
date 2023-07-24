import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const PAGE_LIMIT = 20;

const getParams = ({ activeTab }) => ({
	page_limit            : PAGE_LIMIT,
	status_stats_required : true,
	filters               : {
		status: activeTab,
	},
});

const useListChatAgents = ({ activeTab }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_chat_agents',
		method : 'get',
	}, { manual: true });

	const chatAgent = useCallback(() => {
		try {
			trigger({
				params: getParams({ activeTab }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, activeTab]);

	useEffect(() => {
		chatAgent();
	}, [chatAgent]);

	return {
		data,
		loading,
	};
};

export default useListChatAgents;
