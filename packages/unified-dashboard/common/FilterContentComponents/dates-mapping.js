import { subtractDays } from '@cogoport/utils';

const datesMapping = (range) => {
	const date = new Date();
	let startDate = date;
	let endDate = date;
	if (range === 'yesterday') {
		const new_date = subtractDays(date, 1);
		startDate = new_date;
		endDate = new_date;
	} else if (range === 'last_7_days') {
		const new_date = subtractDays(date, 6);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_14_days') {
		const new_date = subtractDays(date, 13);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_month') {
		const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
		startDate = firstDay;
		endDate = lastDay;
	} else if (range === 'current_month') {
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		startDate = firstDay;
		endDate = date;
	}

	return { startDate, endDate };
};

export default datesMapping;
