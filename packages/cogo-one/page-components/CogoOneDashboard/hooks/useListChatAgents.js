import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE_NUMBER = 1;

const getParams = ({ activeTab, page, userId }) => ({
	page_limit            : PAGE_LIMIT,
	page,
	status_stats_required : true,
	filters               : {
		status            : activeTab,
		sales_agent_rm_id : userId,
	},
});

const useListChatAgents = ({ activeTab }) => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_chat_agents',
		method : 'get',
	}, { manual: true });

	const chatAgent = useCallback(({ page }) => {
		try {
			trigger({
				params: getParams({ activeTab, page, userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, activeTab, userId]);

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
