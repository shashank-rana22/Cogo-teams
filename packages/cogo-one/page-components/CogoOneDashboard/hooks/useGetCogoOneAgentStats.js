import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import DATE_MAPPING from '../utils/formatPayload';

const DURATION_TYPE = {
	day   : 'hours',
	week  : 'days',
	month : 'weeks',
};

const VIEW_TYPES_WITH_PAYLOAD = [
	'Sales',
	'Support',
	'cp_support',
	'Sales_admin',
	'Support_admin',
];

const getParams = ({ timeline, startDate, endDate, id, viewType }) => {
	const PAYLOAD = {};

	if (VIEW_TYPES_WITH_PAYLOAD.some((type) => viewType.includes(type))) {
		PAYLOAD.supplier_stats_required = false;
		PAYLOAD.sales_stats_required = true;
		PAYLOAD.show_agent_activity_graph = false;
	}

	return {
		duration_type : DURATION_TYPE[timeline],
		start_date    : !startDate
			? new Date(DATE_MAPPING[timeline].startDate)
			: new Date(startDate),
		end_date: !endDate
			? new Date(DATE_MAPPING[timeline].endDate)
			: new Date(endDate),
		filters: {
			sales_agent_id: id || undefined,
		},
		...PAYLOAD,
	};
};

function useGetCogoOneAgentStats({
	timeline = '',
	selectedDate = {},
	id = '',
	viewType = '',
}) {
	const { startDate = {}, endDate = {} } = selectedDate || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_agent_stats',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline, startDate, endDate, id, viewType }),
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [trigger, timeline, startDate, endDate, id, viewType]);

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
