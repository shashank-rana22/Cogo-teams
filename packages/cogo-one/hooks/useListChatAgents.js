import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useListChatAgents(search) {
	const [pagination, setPagination] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();
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
				params: {
					filters    : { q: query || undefined },
					page       : pagination,
					page_limit : 10,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, pagination, query]);

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setPagination(1);
	}, [query]);

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
