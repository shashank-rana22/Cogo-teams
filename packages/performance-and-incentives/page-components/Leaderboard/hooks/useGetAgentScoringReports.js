import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetScoringReports = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [currLevel, setCurrLevel] = useState('');
	const [levelStack, setLevelStack] = useState([]);

	const [params, setParams] = useState({
		page               : 1,
		page_limit         : 10,
		user_data_required : true,
		role_data_required : true,
		sort_by            : 'rank',
		sort_type          : 'asc',

		filters: {
			report_type: 'kam_report',
		},
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

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
			},
		}));
	}, [searchQuery]);

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
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
	};
};

export default useGetScoringReports;
