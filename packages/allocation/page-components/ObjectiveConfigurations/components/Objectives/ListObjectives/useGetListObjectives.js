import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetListObjectives = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [toggleValue, setToggleValue] = useState('active');

	const [searchValue, setSearchValue] = useState('');

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
		filters    : {
			status : toggleValue || undefined,
			q      : searchQuery || undefined,
		},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/objectives',
		method  : 'GET',
		authkey : 'get_allocation_objectives',
		params,
	}, { manual: false });

	const { list, ...paginationData } = data || {};

	const getNextPage = (nextPage) => {
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
				status : toggleValue === 'active' ? ['active', 'live'] : 'inactive',
				q      : searchQuery || undefined,
			},
		}));
	}, [toggleValue, searchQuery]);

	return {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		setToggleValue,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useGetListObjectives;
