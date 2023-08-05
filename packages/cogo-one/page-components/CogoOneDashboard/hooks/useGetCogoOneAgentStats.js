import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import DATE_MAPPING from '../utils/formatPayload';

const DURATION_TYPE = {
	day   : 'hours',
	week  : 'days',
	month : 'weeks',
};

const getParams = ({ timeline, startDate, endDate, id, userId }) => ({
	duration_type : DURATION_TYPE[timeline],
	start_date    : !startDate
		? new Date(DATE_MAPPING[timeline].startDate) : new Date(startDate),
	end_date: !endDate
		? new Date(DATE_MAPPING[timeline].endDate) : new Date(endDate),
	filters: {
		sales_agent_id    : id || undefined,
		sales_agent_rm_id : !id ? userId : undefined,
	},
});

function useGetCogoOneAgentStats({
	timeline = '',
	selectedDate = {},
	id = '',
}) {
	const { startDate = {}, endDate = {} } = selectedDate || {};

	const { userId } = useSelector(({ profile }) => ({
		userId: profile?.user?.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_agent_stats',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline, startDate, endDate, id, userId }),
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [timeline, trigger, startDate, endDate, id, userId]);

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
