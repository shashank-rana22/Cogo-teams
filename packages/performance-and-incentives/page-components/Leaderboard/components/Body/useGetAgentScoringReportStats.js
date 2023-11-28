import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import REPORTEE_TYPE from '../../../../constants/leaderboard-reportee-type';
import LEADERBOARD_REPORT_TYPE_CONSTANTS, { MANAGER_KAM_REPORT }
	from '../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';
import { getFormattedDate } from '../../../../utils/get-formatted-date';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const { ADMIN_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const { KAM } = REPORTEE_TYPE;

const getUserIdFilter = ({ currLevel, levelStack, loggedInUser, viewType }) => {
	if (currLevel.report_type === MANAGER_KAM_REPORT) return undefined;

	if (viewType !== ADMIN && isEmpty(levelStack)) {
		return loggedInUser.id;
	}

	return currLevel.user?.id;
};

const getReportTypeFilter = ({ currLevel }) => {
	if (currLevel.report_type === MANAGER_KAM_REPORT) return undefined;

	if (currLevel.report_type === ADMIN_REPORT) return AGENT_REPORT;

	return currLevel.report_type;
};

const getReporteeTypeFilter = ({ currLevel }) => {
	if (currLevel.report_type === MANAGER_KAM_REPORT) return KAM;

	return undefined;
};

function useGetAgentScoringReportStats(props) {
	const { currLevel, dateRange, entity, levelStack } = props;

	const { incentive_leaderboard_viewtype: viewType, user: loggedInUser } = useSelector(({ profile }) => profile);

	const [statParams, setStatParams] = useState({
		filters: {
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			user_id                 : viewType !== ADMIN ? loggedInUser.id : undefined,
			report_type             : currLevel.report_type === ADMIN_REPORT ? undefined : currLevel.report_type,
		},
	});

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/report_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_report_stats',
		params  : statParams,
	}, { manual: false });

	useEffect(() => {
		if (!currLevel.isExpanded || !isEmpty(currLevel.user)) {
			setStatParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),

					report_type        : getReportTypeFilter({ currLevel }),
					office_location_id : currLevel.location_id || undefined,
					channel            : currLevel.channel || undefined,
					user_id            : getUserIdFilter({ currLevel, levelStack, loggedInUser, viewType }),
					user_rm_ids        : isEmpty(currLevel.user_rm_ids) ? undefined : currLevel.user_rm_ids,
					reportee_type      : getReporteeTypeFilter({ currLevel }),
				},
			}));
		}
	}, [currLevel, levelStack, loggedInUser, viewType]);

	useEffect(() => {
		setStatParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate
					? getFormattedDate({ currentDate: dateRange?.endDate }) : undefined,
				partner_id: entity || undefined,
			},
		}));
	}, [dateRange, entity]);

	return {
		data,
		statsLoading : loading,
		refetchStats : refetch,
		setStatParams,
	};
}

export default useGetAgentScoringReportStats;
