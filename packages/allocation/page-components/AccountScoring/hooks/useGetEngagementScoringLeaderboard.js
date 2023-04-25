import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetEngagementScoringLeaderboard() {
	const [params, setParams] = useState({
		filters: {
			created_at : undefined,
			service_id : undefined,
		},
	});

	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_leaderboard',
		params,
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		leaderboardLoading   : loading,
		leaderboardList      : list,
		setLeaderboardParams : setParams,
	};
}

export default useGetEngagementScoringLeaderboard;
