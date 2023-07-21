import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListOmniChannelAgentRanking = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_agent_rankings',
		method : 'get',
	}, { manual: true });

	const listAgentRanking = useCallback(() => {
		try {
			trigger({});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		listAgentRanking();
	}, [listAgentRanking]);

	return {
		data,
		loading,
	};
};

export default useListOmniChannelAgentRanking;
