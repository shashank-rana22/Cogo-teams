import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetEngagementScoringLeaderboard() {
	const [params, setParams] = useState({});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_leaderboard',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

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
		paginationData,
		getNextPage,
		refetch,
	};
}

export default useGetEngagementScoringLeaderboard;
