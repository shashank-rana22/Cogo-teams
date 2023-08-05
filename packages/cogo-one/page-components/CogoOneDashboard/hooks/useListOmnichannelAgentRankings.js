import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ userId }) => ({
	filters: {
		sales_agent_rm_id: userId,
	},
});

const useListOmniChannelAgentRanking = () => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_agent_rankings',
		method : 'get',
	}, { manual: true });

	const listAgentRanking = useCallback(() => {
		try {
			trigger({
				params: getParams({ userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, userId]);

	useEffect(() => {
		listAgentRanking();
	}, [listAgentRanking]);

	return {
		data,
		loading,
	};
};

export default useListOmniChannelAgentRanking;
