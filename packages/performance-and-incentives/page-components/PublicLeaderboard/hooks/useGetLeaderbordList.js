import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useContext } from 'react';

import getFormattedDate from '../../../utils/get-formatted-date';
import getRankFromScore from '../configurations/getRankFromScore';
import PublicLeaderBoardContext from '../context/PublicLeaderBoardContext';
import LEADERBOARD_LOCATIONS from '../utils/leaderboard-locations';

const getLocation = ({
	office_location_id,
	officeLocation,
}) => office_location_id || LEADERBOARD_LOCATIONS[officeLocation]?.value || undefined;

function useGetLeaderbordList(props) {
	const {
		view,
		dateRange,
		pageLimit,
		setUpdatedAt = () => {},
		office_location_id = null,
		score = {},
		setScore = () => {},
		setNextReloadAt = () => {},
	} = props;

	const { countdown, officeLocation } = useContext(PublicLeaderBoardContext);

	const [params, setParams] = useState({
		page                     : 1,
		page_limit               : pageLimit,
		user_data_required       : true,
		role_data_required       : true,
		add_user_kam_report_data : ['owner_wise', 'manager_wise'].includes(view),
		filters                  : {
			report_view_type        : view,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const {
		list = [],
		total_report_count = 0,
		report_synced_at = '',
		reload_duration = '',
		additional_stats = {},
	} = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			add_user_kam_report_data  : ['owner_wise', 'manager_wise'].includes(view),
			additional_stats_required : !!office_location_id,
			filters                   : {
				...(previousParams.filters || {}),
				report_view_type : view || undefined,
				report_type      : ['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
					? `${view.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}_report` : undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate
					? getFormattedDate({ currentDate: dateRange?.endDate }) : undefined,
				office_location_id: getLocation({ office_location_id, officeLocation }),
			},
		}));
	}, [view, dateRange, office_location_id, officeLocation]);

	const rankData = getRankFromScore({ score });

	useEffect(() => {
		setUpdatedAt(report_synced_at);
		setNextReloadAt(reload_duration);
		if (office_location_id) setScore((p) => ({ ...p, [office_location_id]: additional_stats?.total_score }));
	}, [report_synced_at,
		setUpdatedAt,
		reload_duration,
		setNextReloadAt,
		additional_stats,
		setScore,
		office_location_id]);

	useEffect(() => {
		if (countdown === 0) {
			trigger();
		}
	}, [countdown, trigger]);

	return {
		list,
		loading,
		trigger,
		total_report_count,
		additional_stats,
		rank: rankData[office_location_id]?.rank || 2,
	};
}

export default useGetLeaderbordList;
