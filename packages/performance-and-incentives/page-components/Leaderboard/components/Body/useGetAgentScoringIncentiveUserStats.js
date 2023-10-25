import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';

const OFFSET = 1;

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getUserIdFilter = ({ currLevel, levelStack, loggedInUser, viewType }) => {
	if (viewType !== ADMIN && isEmpty(levelStack)) {
		return loggedInUser.id;
	}

	return currLevel.user?.id;
};

function getFirstAndLastDateOfMonth({ incentiveMonth }) {
	const [month, year] = incentiveMonth.split('-');

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	if (month === currentMonth.toString() && year === currentYear.toString()) {
		return {
			firstDate : new Date(currentYear, currentMonth, OFFSET),
			lastDate  : undefined,
		};
	}

	const firstDate = new Date(Number(year), Number(month), OFFSET);

	const nextMonth = new Date(Number(year), Number(month) + OFFSET, OFFSET);
	const lastDate = new Date(nextMonth.getTime() - OFFSET);

	return { firstDate, lastDate };
}

function useGetAgentScoringIncentiveUserStats(props) {
	const { currLevel, entity, levelStack } = props;

	const { incentive_leaderboard_viewtype: viewType, user: loggedInUser } = useSelector(({ profile }) => profile);

	const currentDate = new Date();
	const defaultIncentiveMonth = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;

	const [incentiveMonth, setIncentiveMonth] = useState(defaultIncentiveMonth);

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/incentive_user_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_incentive_user_stats',
	}, { manual: true });

	const userIncentiveStats = useCallback(async () => {
		const { firstDate, lastDate } = getFirstAndLastDateOfMonth({ incentiveMonth });

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
					cycle_start_date_greater_than : firstDate || undefined,
					cycle_end_date_less_than      : lastDate || undefined,
				},

			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	}, [currLevel, entity, incentiveMonth, levelStack, loggedInUser, refetch, viewType]);

	useEffect(() => {
		if ((!currLevel.isExpanded || !isEmpty(currLevel.user)) && currLevel.report_type === AGENT_REPORT) {
			userIncentiveStats();
		}
	}, [currLevel.isExpanded, currLevel.report_type, currLevel.user, userIncentiveStats]);

	return {
		userIncentiveData         : data,
		userIncentiveStatsLoading : loading,
		incentiveMonth,
		setIncentiveMonth,
	};
}

export default useGetAgentScoringIncentiveUserStats;
