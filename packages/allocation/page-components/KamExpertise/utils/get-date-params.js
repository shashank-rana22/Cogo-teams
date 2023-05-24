import { getMonth, getYear, getDate, startOfWeek, startOfMonth } from '@cogoport/utils';

function getDateParams() {
	const currentTime = new Date();

	const month = getMonth(currentTime);

	const day = getDate(currentTime);

	const year = getYear(currentTime);

	const weekEnd = startOfWeek(new Date(year, month, day));

	const monthEnd = startOfMonth(new Date(year, month, day));

	const quarter = Math.floor(((month + 1) / 3));
	const startFullQuarter = new Date(year, quarter * 3 - 3, 1);

	const yearEnd = new Date(year, 0, 1);

	const TAB_PANEL_MAPPING = {
		this_week: {
			name   : 'this_week',
			title  : 'This Week',
			params : {
				start_date : weekEnd,
				end_date   : currentTime,
			},
		},
		this_month: {
			name   : 'this_month',
			title  : 'This Month',
			params : {
				start_date : monthEnd,
				end_date   : currentTime,
			},
		},
		this_quarter: {
			name   : 'this_quarter',
			title  : 'This Quarter',
			params : {
				start_date : startFullQuarter,
				end_date   : currentTime,
			},
		},
		this_year: {
			name   : 'this_year',
			title  : 'This Year',
			params : {
				start_date : yearEnd,
				end_date   : currentTime,
			},
		},
	};

	return TAB_PANEL_MAPPING;
}

export default getDateParams;
