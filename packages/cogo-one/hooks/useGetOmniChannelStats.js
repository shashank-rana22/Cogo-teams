import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const getDateString = ({ date }) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

const getParams = ({ timePeriodValue }) => ({
	duration_type : timePeriodValue,
	start_date    : getDateString({ date: DATE_FILTER_MAPPING[timePeriodValue]?.(new Date()) }),
	end_date      : getDateString({ date: new Date() }),
});

function useGetCogoOneAgentStats({ isPunchPresent, timePeriodValue = '' }) {
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
				params: getParams({ timePeriodValue, userId }),
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [trigger, userId, timePeriodValue]);

	useEffect(() => {
		if (isPunchPresent) {
			getCogoOneDashboard();
		}
	}, [getCogoOneDashboard, isPunchPresent]);

	return {
		AgentStatsLoading : loading,
		getCogoOneDashboard,
		AgentStatsData    : data,
	};
}
export default useGetCogoOneAgentStats;
