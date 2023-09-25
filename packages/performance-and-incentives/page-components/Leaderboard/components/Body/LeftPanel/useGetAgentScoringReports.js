import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useGetScoringReports = (props) => {
	const { dateRange, entity } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = viewType.split('_');

	const [searchValue, setSearchValue] = useState('');
	const [currLevel, setCurrLevel] = useState([`${view}_report`, '']);
	const [levelStack, setLevelStack] = useState([]);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isChannel, setIsChannel] = useState(false);

	let report_view_type;

	if (view === 'admin') {
		report_view_type = isChannel ? 'channel_wise' : 'location_wise';
	} else {
		report_view_type = `${view}_wise`;
	}

	const [params, setParams] = useState({
		page                    : 1,
		page_limit              : 10,
		user_data_required      : true,
		role_data_required      : true,
		sort_by                 : 'rank',
		sort_type               : 'asc',
		add_current_user_report : view !== 'admin',
		filters                 : {
			report_view_type,
			...(view !== 'admin' ? { report_type: `${view}_report` } : {}),
			q                       : searchQuery || undefined,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], current_user_data: currentUserData } = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q                       : searchQuery || undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
			},
		}));
	}, [searchQuery, dateRange, entity]);

	useEffect(() => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				...(view === 'admin' ? { report_view_type: isChannel ? 'channel_wise' : 'location_wise' } : {}),

			},
		}));
	}, [isChannel, view]);

	return {
		params,
		setParams,
		loading,
		list,
		debounceQuery,
		searchValue,
		setSearchValue,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
		isExpanded,
		setIsExpanded,
		viewType,
		isChannel,
		setIsChannel,
		refetch: trigger,
	};
};

export default useGetScoringReports;
