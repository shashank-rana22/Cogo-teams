import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetEngagementScoringLeaderboard(watch) {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_leaderboard',
	}, { manual: false });

	const organization = watch('organization');
	const kam = watch('kam');
	const date = watch('date');
	const segment = watch('segment_id');

	useEffect(() => {
		refetch();
		console.log('organization', organization);
		console.log('date', date);
		console.log('kam', kam);
		console.log('segment', segment);
	}, [organization, refetch, kam, date, segment]);

	const { list = [] } = data || {};

	return {
		leaderboardLoading : loading,
		leaderboardList    : list,
	};
}

export default useGetEngagementScoringLeaderboard;
