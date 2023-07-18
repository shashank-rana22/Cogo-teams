import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const MONTH_NUMBER = 1;
const WEEK_NUMBER = 6;

const DATE_MAPPING = {
	day: {
		startDate : new Date(),
		endDate   : new Date(),
	},
	week: {
		startDate : new Date(),
		endDate   : new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + WEEK_NUMBER)),
	},
	// month: {
	// 	startDate: formatDate({
	// 		date       : new Date(new Date().getFullYear(), new Date().getMonth(), MONTH_NUMBER),
	// 		dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
	// 		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
	// 		formatType : 'dateTime',
	// 		separator  : ' ',
	// 	}),
	// 	endDate: formatDate({
	// 		date: new Date(
	// 			new Date().getFullYear(),
	// 			new Date().getMonth() + MONTH_NUMBER,
	// 			GLOBAL_CONSTANTS.zeroth_index,
	// 		),
	// 		dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
	// 		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
	// 		formatType : 'dateTime',
	// 		separator  : ' ',
	// 	}),
	// },
	month: {
		startDate : new Date(new Date().getFullYear(), new Date().getMonth(), MONTH_NUMBER),
		endDate   : new Date(
			new Date().getFullYear(),
			new Date().getMonth() + MONTH_NUMBER,
			GLOBAL_CONSTANTS.zeroth_index,
		),
	},
};

function useGetCogoOneAgentStats({
	timeline = '',
	// selectedTimeline = {},
	// selectedItem = '',
	// partnerUserId = '',
	// isAgentView,
	selectedDate = {},
}) {
	const { startDate = {}, endDate = {} } = selectedDate || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_agent_stats',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = useCallback(() => {
		try {
			trigger({
				params: {
					duration_type : timeline,
					start_date    : !startDate
						? new Date(DATE_MAPPING[timeline].startDate).toISOString() : new Date(startDate).toISOString(),
					end_date: !endDate
						? new Date(DATE_MAPPING[timeline].endDate).toISOString() : new Date(endDate).toISOString(),
					// agent_id      : (partnerUserId && isAgentView) || agentId ? agentId || partnerUserId : undefined,
				},
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [timeline, trigger, startDate, endDate]);

	useEffect(() => {
		getCogoOneDashboard();
	}, [getCogoOneDashboard]);

	return {
		loading,
		getCogoOneDashboard,
		listData: data,
	};
}
export default useGetCogoOneAgentStats;
