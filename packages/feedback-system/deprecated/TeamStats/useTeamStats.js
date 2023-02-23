import { useRequest } from '@cogoport/request';
import { differenceInDays, getMonth, getYear } from '@cogoport/utils';
import { useEffect } from 'react';

const getSaturday = (date) => {
	date.setDate(1);
	while (date.getDay() !== 6) {
		date.setDate(date.getDate() + 1);
	}
	return date;
};

const useTeamStats = () => {
	const currentDate = new Date();
	const year = getYear(currentDate);
	const lastMonth = getMonth(currentDate) - 1;

	const firstDayOfLastMonth = new Date(year, lastMonth, 1);
	const firstSaturday = getSaturday(currentDate);

	const firstSaturdayOfLastMonth = getSaturday(firstDayOfLastMonth);

	const differenceInDays1 = differenceInDays(firstSaturday, new Date());

	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_feedback_dashboard_stats',
	}, { manual: true });

	const getTeamStats = () => {
		trigger({
			params: {
				filters: {
					created_at_greater_than:
							differenceInDays1 > 1 ? firstSaturdayOfLastMonth
								: firstSaturday,
				},
			},
		});
	};

	useEffect(() => {
		getTeamStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		data,
	};
};

export default useTeamStats;
