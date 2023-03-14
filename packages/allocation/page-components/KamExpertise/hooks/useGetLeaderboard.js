import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetLeaderboard() {
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();
	const [badgeName, setBadgeName] = useState('');
	const [params, setParams] = useState({
		page            : 1,
		partner_user_id : '',
		filters         : {
			// name of the kam
			name: searchQuery || undefined,

			// badge
			badge: badgeName || undefined,
		},
	});

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				name  : searchQuery || undefined,
				badge : badgeName || undefined,
			},
		}));
	}, [searchQuery, badgeName]);

	const getNextPage = (newPage) => {
		setParams((pv) => ({
			...pv,
			page: newPage,
		}));
	};

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_leaderboard',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_leaderboard',
		params,
	});

	const [leaderboardList = [], ...paginationData] = data || {};

	return {
		loading,
		leaderboardList,
		listRefetch: refetch,
		setBadgeName,
		debounceQuery,
		paginationData,
		getNextPage,
	};
}

export default useGetLeaderboard;
