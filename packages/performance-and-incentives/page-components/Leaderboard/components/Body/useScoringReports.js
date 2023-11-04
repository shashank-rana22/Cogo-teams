import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';
import getFormattedDate from '../../../../utils/get-formatted-date';
import getReportViewType from '../../helpers/getReportViewType';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const { ADMIN_REPORT, OWNER_REPORT, MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getReportTypeFilter = ({ currLevel }) => {
	if (currLevel.report_type === ADMIN_REPORT || !isEmpty(currLevel.user)) {
		return undefined;
	}

	return currLevel.report_type;
};

const getUserRmIdsFilter = ({ currLevel, levelStack }) => {
	if (currLevel.isExpanded) {
		return [levelStack[GLOBAL_CONSTANTS.zeroth_index]?.user?.id, ...(currLevel.user_rm_ids || [])];
	}

	return [currLevel.user?.id, ...(currLevel.user_rm_ids || [])];
};

const useScoringReports = (props) => {
	const { currLevel, dateRange, entity, isChannel, levelStack, setUserPosition } = props;

	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = incentive_leaderboard_viewtype.split('_');

	const [params, setParams] = useState({
		user_data_required       : true,
		role_data_required       : true,
		pagination_data_required : false,
		add_current_user_report  : incentive_leaderboard_viewtype !== ADMIN,
		add_user_kam_report_data : [OWNER_REPORT, MANAGER_REPORT].includes(getReportTypeFilter({ currLevel })),
		filters                  : {
			report_view_type        : getReportViewType({ currLevel, isChannel }),
			report_type             : incentive_leaderboard_viewtype !== ADMIN ? `${view}_report` : undefined,
			q                       : searchQuery || undefined,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			current_user_id         : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], current_user_report: currentUserData, report_synced_at: lastUpdatedAt = '' } = data || {};

	useEffect(() => {
		if (currLevel.report_type !== AGENT_REPORT || (currLevel.isExpanded && isEmpty(currLevel.user))) {
			setParams((previousParams) => ({
				...previousParams,
				is_expanded_view         : (currLevel.isExpanded && isEmpty(currLevel.user)) ? true : undefined,
				add_user_kam_report_data : [OWNER_REPORT, MANAGER_REPORT].includes(getReportTypeFilter({ currLevel })),
				filters                  : {
					...(previousParams.filters || {}),
					report_view_type   : getReportViewType({ currLevel, isChannel }),
					office_location_id : currLevel.location_id || undefined,
					channel            : currLevel.channel || undefined,
					report_type        : getReportTypeFilter({ currLevel }),
					user_rm_ids        : getUserRmIdsFilter({ currLevel, levelStack }),
				},
			}));
		}
	}, [setParams, currLevel, levelStack, isChannel, incentive_leaderboard_viewtype]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q                       : searchQuery || undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate
					? getFormattedDate({ currentDate: dateRange?.endDate }) : undefined,
				partner_id: entity || undefined,
			},
		}));
	}, [searchQuery, dateRange, entity, setParams]);

	useEffect(() => {
		const userPostion = list.findIndex((item) => item.user?.id === user?.id);

		setUserPosition(userPostion || 0);
	}, [list, setUserPosition, user.id]);

	return {
		list,
		listLoading : loading,
		currentUserData,
		params,
		setParams,
		debounceQuery,
		listRefetch : trigger,
		lastUpdatedAt,
	};
};

export default useScoringReports;
