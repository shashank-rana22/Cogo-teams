import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const getParams = ({ userId, value }) => ({
	filters: {
		agent_id                     : userId,
		status                       : 'escalated',
		created_at_greater_than      : DATE_FILTER_MAPPING[value]?.(new Date()),
		additional_data_required     : false,
		service_object_data_required : false,

	},
});

const useGetAgentTimelineEscalate = ({ viewType = '', timePeriodValue }) => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timelines',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const isSupplyAgent = viewType === 'supply';

	const agentEscalateTimeline = useCallback(() => {
		if (!isSupplyAgent) {
			return;
		}

		try {
			trigger({
				params: getParams({ userId, value: timePeriodValue }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [isSupplyAgent, timePeriodValue, trigger, userId]);

	useEffect(() => {
		agentEscalateTimeline({ userId });
	}, [agentEscalateTimeline, userId]);

	return {
		data,
		escalateLoading: loading,
		agentEscalateTimeline,
	};
};

export default useGetAgentTimelineEscalate;
