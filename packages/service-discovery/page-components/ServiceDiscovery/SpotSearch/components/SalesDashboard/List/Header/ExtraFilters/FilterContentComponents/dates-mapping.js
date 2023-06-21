import { subtractDays } from '@cogoport/utils';

const datesMapping = (range) => {
	const date = new Date();
	let startDate = date;
	let endDate = date;
	if (range === 'yesterday') {
		const new_date = subtractDays(date, 1);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_3_days') {
		const new_date = subtractDays(date, 2);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_7_days') {
		const new_date = subtractDays(date, 6);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_14_days') {
		const new_date = subtractDays(date, 13);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_month') {
		const new_date = subtractDays(date, 29);
		startDate = new_date;
		endDate = date;
	} else if (range === 'today') {
		const new_date = new Date();
		startDate = new_date;
	}
	startDate.setHours(0, 0, 0, 0);

	return {
		validity_start_greater_than : startDate,
		validity_end_less_than      : endDate,
	};
};

export default datesMapping;
