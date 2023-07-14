import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetEngagementScoringLeaderboard() {
	const [params, setParams] = useState({});

	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_leaderboard',
		params,
	}, { manual: false });

	const { list = [], page = 1, page_limit = 0, total_count = 0 } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => {
			let newParams = {};
			newParams = {
				...previousParams,
				page: newPage,
			};

			return newParams;
		});
	};

	return {
		leaderboardLoading   : loading,
		leaderboardList      : list,
		setLeaderboardParams : setParams,
		page,
		page_limit,
		total_count,
		getNextPage,
	};
}

export default useGetEngagementScoringLeaderboard;
