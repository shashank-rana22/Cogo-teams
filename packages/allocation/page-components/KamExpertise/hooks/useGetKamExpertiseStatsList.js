import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetKamExpertiseStatsList() {
	const [searchKAM, setSearchKAM] = useState('');
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();
	const [badgeName, setBadgeName] = useState('');
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			created_at_greater_than : '',
			created_at_less_than    : '',
			kam_expertise_level     : '',
			name                    : searchQuery || undefined,
			// badge : badgeName || undefined,
		},
	}, { manual: false });

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				name: searchQuery || undefined,
				// badge : badgeName || undefined,
			},
		}));
	}, [searchQuery, badgeName]);

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_stats_list',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_stats_list',
		params,
	});

	const getNextPage = (newPage) => {
		setParams((pv) => ({
			...pv,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	// console.log('leaderboardList', leaderboardList);

	return {
		setParams,
		leaderboardLoading : loading,
		leaderboardList    : list,
		listRefetch        : refetch,
		searchKAM,
		setSearchKAM,
		setBadgeName,
		debounceQuery,
		paginationData,
		getNextPage,
	};
}

export default useGetKamExpertiseStatsList;
