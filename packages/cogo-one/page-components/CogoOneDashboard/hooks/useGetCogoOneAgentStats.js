// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import DATE_MAPPING from '../utils/formatPayload';

function useGetCogoOneAgentStats({
	timeline = '',
	// selectedTimeline = {},
	// selectedItem = '',
	// partnerUserId = '',
	// isAgentView,
	selectedDate = {},
}) {
	const { startDate = {}, endDate = {} } = selectedDate || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_agent_stats',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = useCallback(() => {
		try {
			trigger({
				params: {
					duration_type : timeline,
					start_date    : !startDate
						? new Date(DATE_MAPPING[timeline].startDate) : new Date(startDate),
					end_date: !endDate
						? new Date(DATE_MAPPING[timeline].endDate) : new Date(endDate),
				},
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [timeline, trigger, startDate, endDate]);

	useEffect(() => {
		getCogoOneDashboard();
	}, [getCogoOneDashboard]);

	return {
		loading,
		getCogoOneDashboard,
		data,
	};
}
export default useGetCogoOneAgentStats;
