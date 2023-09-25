import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../constants/leaderboard-viewtype-constants';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

function useGetAgentScoringReportStats(props) {
	const { dateRange, entity, params } = props;

	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const [statParams, setStatParams] = useState({
		filters: {
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			user_id                 : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
		},
	});

	const [{ data, loading }] = useAllocationRequest({
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
				...(params.filters || {}),
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
			},
		}));
	}, [dateRange, entity, params]);

	return {
		data,
		loading,
	};
}

export default useGetAgentScoringReportStats;
