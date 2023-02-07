import { useRequest } from '@cogoport/request';
import { differenceInDays } from '@cogoport/utils';
import { useEffect } from 'react';

const useTeamStats = () => {
	const getSaturday = (date) => {
		date.setDate(1);
		while (date.getDay() !== 6) {
			date.setDate(date.getDate() + 1);
		}
		return date;
	};

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const lastMonth = currentDate.getMonth() - 1;

	const firstDayOfLastMonth = new Date(year, lastMonth, 1);

	const firstSaturday = getSaturday(currentDate);

	const firstSaturdayOfLastMonth = getSaturday(firstDayOfLastMonth);

	const differenceInDays1 = differenceInDays(firstSaturday, new Date());

	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_feedback_dashboard_stats',
	}, { manual: true });

	const getTeamStats = () => {
		try {
			trigger({
				params: {
					filters: {
						created_at_greater_than:
							differenceInDays1 > 1 ? firstSaturdayOfLastMonth : firstSaturday,
					},
				},
			});
		} catch (e) {
			console.log(e.toString());
		}
	};

	useEffect(() => {
		getTeamStats();
	}, []);

	return {
		loading,
		data,
	};
};

export default useTeamStats;
