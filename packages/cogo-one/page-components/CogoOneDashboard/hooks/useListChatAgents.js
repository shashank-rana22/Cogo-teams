import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE_NUMBER = 1;

const getParams = ({ activeTab, page }) => ({
	page_limit            : PAGE_LIMIT,
	page,
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

	const chatAgent = useCallback(({ page }) => {
		try {
			trigger({
				params: getParams({ activeTab, page }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, activeTab]);

	useEffect(() => {
		chatAgent({ page: DEFAULT_PAGE_NUMBER });
	}, [chatAgent]);

	return {
		data,
		loading,
		chatAgent,
	};
};

export default useListChatAgents;
