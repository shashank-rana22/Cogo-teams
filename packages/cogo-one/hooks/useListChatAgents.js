import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 10;

const getParams = ({ agentType, page, query }) => ({
	filters: {
		q          : query || undefined,
		agent_type : agentType || undefined,
	},
	page,
	page_limit: PAGE_LIMIT,
});

function useListChatAgents() {
	const [paramsState, setParamsState] = useState({
		page      : 1,
		query     : '',
		agentType : '',
	});

	const { query: debounceSearchQuery = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data: listAgentStatus }, trigger] = useRequest(
		{
			url    : '/list_chat_agents',
			method : 'get',
		},
		{ manual: true },
	);

	const getListChatAgents = useCallback(async () => {
		try {
			await trigger({
				params: getParams({
					agentType : paramsState?.agentType,
					page      : paramsState?.page,
					query     : debounceSearchQuery,
				}),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, paramsState?.agentType, paramsState?.page, debounceSearchQuery]);

	useEffect(() => {
		debounceQuery(paramsState?.query);
	}, [debounceQuery, paramsState?.query]);

	useEffect(() => {
		setParamsState((p) => ({ ...p, page: 1 }));
	}, [debounceSearchQuery, paramsState?.agentType]);

	useEffect(() => {
		getListChatAgents();
	}, [getListChatAgents]);

	return {
		loading,
		listAgentStatus,
		setPagination : (val) => setParamsState((prev) => ({ ...prev, page: val })),
		getListChatAgents,
		setSearch     : (val) => setParamsState((prev) => ({ ...prev, query: val })),
		setAgentType  : (val) => setParamsState((prev) => ({ ...prev, agentType: val })),
		paramsState,
	};
}
export default useListChatAgents;
