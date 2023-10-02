import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getUserIdFilter = ({ currLevel, levelStack, loggedInUser, viewType }) => {
	if (viewType !== ADMIN && isEmpty(levelStack)) {
		return loggedInUser.id;
	}

	return currLevel.user?.id;
};

function useGetAgentScoringIncentiveUserStats(props) {
	const { currLevel, dateRange, entity, levelStack } = props;

	const { incentive_leaderboard_viewtype: viewType, user: loggedInUser } = useSelector(({ profile }) => profile);

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/incentive_user_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_incentive_user_stats',
	}, { manual: true });

	const userIncentiveStats = useCallback(async () => {
		try {
			await refetch({
				params: {
					partner_id : entity || undefined,
					user_id    : getUserIdFilter({
						currLevel,
						levelStack,
						loggedInUser,
						viewType,
					}),
					cycle_start_date_greater_than : dateRange?.startDate || undefined,
					cycle_end_date_less_than      : dateRange?.endDate || undefined,
				},

			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	}, [currLevel, dateRange, entity, levelStack, loggedInUser, refetch, viewType]);

	useEffect(() => {
		if ((!currLevel.isExpanded || !isEmpty(currLevel.user)) && currLevel.report_type === AGENT_REPORT) {
			userIncentiveStats();
		}
	}, [currLevel.isExpanded, currLevel.report_type, currLevel.user, userIncentiveStats]);

	return {
		userIncentiveData         : data,
		userIncentiveStatsLoading : loading,
		refetchUserIncentiveStats : refetch,
	};
}

export default useGetAgentScoringIncentiveUserStats;
