import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetKamExpertiseStatsList() {
	const [searchKAM, setSearchKAM] = useState('');

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [badgeName, setBadgeName] = useState([]);

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			q     : searchQuery || undefined,
			badge : badgeName || undefined,
		},
	});

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				q     : searchQuery || undefined,
				badge : badgeName || undefined,
			},
		}));
	}, [searchQuery, badgeName]);

	const [{ loading, data }] = useAllocationRequest({
		url     : '/kam_expertise_stats_list',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_stats_list',
		params,
	}, { manual: !(params?.filters?.kam_expertise_level) });

	const getNextPage = (newPage) => {
		setParams((pv) => ({
			...pv,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		setListParams      : setParams,
		leaderboardLoading : loading,
		leaderboardList    : list,
		searchKAM,
		setSearchKAM,
		badgeName,
		setBadgeName,
		debounceQuery,
		paginationData,
		getNextPage,
	};
}

export default useGetKamExpertiseStatsList;
