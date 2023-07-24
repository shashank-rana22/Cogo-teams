import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const PAGE_LIMIT = 30;

const getParams = () => ({
	sort_by                   : 'escalations',
	page_limit                : PAGE_LIMIT,
	escalation_stats_required : true,
});

const useListEscalationChat = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_chat_agents',
		method : 'get',
	}, { manual: true });

	const chatAgent = useCallback(() => {
		try {
			trigger({
				params: getParams(),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		chatAgent();
	}, [chatAgent]);

	return {
		data,
		loading,
	};
};

export default useListEscalationChat;
