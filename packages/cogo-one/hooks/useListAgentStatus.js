import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getParams = ({ agentType, page, query, userId = '', showRmAgentsDetails = false }) => ({
	filters: {
		q                 : query || undefined,
		agent_type        : agentType || undefined,
		sales_agent_rm_id : showRmAgentsDetails ? userId : undefined,
	},
	page,
	page_limit             : PAGE_LIMIT,
	cogoone_shift_required : true,
});

function useListAgentStatus({ agentType = '', showRmAgentsDetails = false }) {
	const userId = useSelector((state) => state?.profile?.user?.id || {});

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

	const getListChatAgents = useCallback(() => {
		try {
			trigger({
				params: getParams({
					agentType,
					page  : paramsState?.page,
					query : debounceSearchQuery,
					userId,
					showRmAgentsDetails,
				}),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, agentType, paramsState?.page, debounceSearchQuery, userId, showRmAgentsDetails]);

	useEffect(() => {
		debounceQuery(paramsState?.query);
	}, [debounceQuery, paramsState?.query]);

	useEffect(() => {
		setParamsState((p) => ({ ...p, page: 1 }));
	}, [debounceSearchQuery]);

	useEffect(() => {
		getListChatAgents();
	}, [getListChatAgents]);

	return {
		loading,
		listAgentStatus,
		setPagination : (val) => setParamsState((prev) => ({ ...prev, page: val })),
		setSearch     : (val) => setParamsState((prev) => ({ ...prev, query: val })),
		paramsState,
		getListChatAgents,
	};
}

export default useListAgentStatus;
