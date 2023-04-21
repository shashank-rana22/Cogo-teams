import { useAllocationRequest } from '@cogoport/request';

function useGetEngagementScoringLeaderboard() {
	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_leaderboard',
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		leaderboardLoading : loading,
		leaderboardList    : list,
	};
}

export default useGetEngagementScoringLeaderboard;
