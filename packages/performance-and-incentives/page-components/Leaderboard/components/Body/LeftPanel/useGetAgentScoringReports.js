import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

const useGetScoringReports = (props) => {
	const { dateRange } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = viewType.split('_');

	const [searchValue, setSearchValue] = useState('');
	const [currLevel, setCurrLevel] = useState([NEXT_LEVEL_MAPPING[`${view}_report`], '']);
	const [levelStack, setLevelStack] = useState([]);
	const [params, setParams] = useState({
		page                    : 1,
		page_limit              : 10,
		user_data_required      : true,
		role_data_required      : true,
		add_current_user_report : true,
		sort_by                 : 'rank',
		sort_type               : 'asc',
		filters                 : {
			report_type: currLevel[GLOBAL_CONSTANTS.zeroth_index],
		},
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], current_user_data: currentUserData, ...paginationData } = data || {};

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
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
		}));
	}, [dateRange]);

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
		currentUserData,
	};
};

export default useGetScoringReports;
