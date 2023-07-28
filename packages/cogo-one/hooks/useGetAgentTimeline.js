import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const getParams = ({ userId }) => ({
	filters: {
		agent_id          : userId,
		conversation_type : 'punched_in',
	},
});

const useGetAgentTimeline = () => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const agentTimeline = useCallback(() => {
		try {
			trigger({
				params: getParams({ userId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, userId]);

	useEffect(() => {
		agentTimeline({ userId });
	}, [agentTimeline, userId]);

	return {
		data,
		timelineLoading: loading,
		agentTimeline,
	};
};

export default useGetAgentTimeline;
