import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../constants/leaderboard-viewtype-constants';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const { ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

function useGetAgentScoringReportStats(props) {
	const { currLevel, dateRange, entity } = props;

	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const [statParams, setStatParams] = useState({
		filters: {
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			user_id                 : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
		},
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/report_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_report_stats',
		params  : statParams,
	}, { manual: false });

	useEffect(() => {
		setStatParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
				report_type             : currLevel.report_type === ADMIN_REPORT ? undefined : currLevel.report_type,
				office_location_id      : currLevel.location_id || undefined,
				channel                 : currLevel.channel || undefined,
				user_id                 : currLevel.user?.id,
				user_rm_ids             : isEmpty(currLevel.user_rm_ids) ? undefined : currLevel.user_rm_ids,
			},
		}));
	}, [dateRange, entity, currLevel]);

	return {
		data,
		statsLoading : loading,
		refetchStats : refetch,
		setStatParams,
	};
}

export default useGetAgentScoringReportStats;
