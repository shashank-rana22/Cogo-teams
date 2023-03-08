import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useBadgeConfigurationList() {
	const [searchValue, setSearchValue] = useState();
	const { debounceQuery, query: searchQuery } = useDebounceQuery();
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status : 'active',
			id     : searchQuery || undefined,
			// badge_name : searchQuery || undefined,
		},
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/allocation/kam_expertise_badge_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
		params,
	}, { manual: false });

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				id: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		searchValue,
		setSearchValue,
		debounceQuery,
		// searchQuery,
		paginationData,
		getNextPage,
		listRefetch: refetch,
	};
}

export default useBadgeConfigurationList;
