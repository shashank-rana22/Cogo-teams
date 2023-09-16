import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetLeaderBoardList = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [entity, setEntity] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/configs',
		method  : 'GET',
		authkey : 'get_agent_scoring_configs',
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
				entity,
			},
		}));
	}, [searchQuery, entity]);

	return {
		params,
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		refetch,
		setEntity,
	};
};

export default useGetLeaderBoardList;
