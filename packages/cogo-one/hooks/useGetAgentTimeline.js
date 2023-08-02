import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const getParams = ({ userId }) => ({
	filters: {
		agent_id          : userId,
		conversation_type : 'punched_in',
	},
});

const useGetAgentTimeline = ({ viewType = '' }) => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const isKamAgent = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.punch_in_out;

	const agentTimeline = useCallback(() => {
		if (!isKamAgent) {
			return;
		}

		try {
			trigger({
				params: getParams({ userId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, userId, isKamAgent]);

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
