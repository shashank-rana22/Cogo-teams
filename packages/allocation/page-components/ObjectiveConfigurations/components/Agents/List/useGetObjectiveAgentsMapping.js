import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetObjectiveAgentsMapping = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [params, setParams] = useState({
		page     : 1,
		role_ids : [],
		filters  : {
			q: searchQuery || undefined,
		},
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/objective_user_mappings',
		method  : 'GET',
		authkey : 'get_allocation_objective_user_mappings',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (nextPage = '') => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		list,
		loading,
		refetch,
		paginationData,
		getNextPage,
		setParams,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useGetObjectiveAgentsMapping;
