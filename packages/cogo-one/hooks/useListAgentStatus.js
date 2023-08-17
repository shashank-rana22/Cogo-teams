import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getParams = ({ agentType, page, query }) => ({
	filters: {
		q          : query || undefined,
		agent_type : agentType || undefined,
	},
	page,
	page_limit: PAGE_LIMIT,
});

function useListAgentStatus({ agentType = '' }) {
	const [paramsState, setParamsState] = useState({
		page  : DEFAULT_PAGE,
		query : '',
	});

	const { query: debounceSearchQuery = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data: listAgentStatus }, trigger] = useRequest(
		{
			url    : '/list_chat_agents',
			method : 'get',
		},
		{ manual: true },
	);

	const getAgentsStatus = useCallback(async () => {
		try {
			await trigger({
				params: getParams({
					agentType,
					page  : paramsState?.page,
					query : debounceSearchQuery,
				}),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, agentType, paramsState?.page, debounceSearchQuery]);

	useEffect(() => {
		debounceQuery(paramsState?.query);
	}, [debounceQuery, paramsState?.query]);

	useEffect(() => {
		setParamsState((p) => ({ ...p, page: 1 }));
	}, [debounceSearchQuery]);

	useEffect(() => {
		getAgentsStatus();
	}, [getAgentsStatus]);

	return {
		isLoading     : loading,
		listAgentStatus,
		setPagination : (val) => setParamsState((prev) => ({ ...prev, page: val })),
		setSearch     : (val) => setParamsState((prev) => ({ ...prev, query: val })),
		paramsState,
		getAgentsStatus,
	};
}

export default useListAgentStatus;
