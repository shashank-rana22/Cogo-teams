import { subtractDays } from '@cogoport/utils';

const SUBSTRACT_ONE_DAY = 1;
const SUBSTRACT_SIX_DAY = 6;
const SUBSTRACT_THIRTEEN_DAY = 13;
const LAST_DAY = 0;
const LAST_AND_FIRST_MONTH = 1;

const datesMapping = (range) => {
	const date = new Date();
	let startDate = date;
	let endDate = date;
	if (range === 'yesterday') {
		const new_date = subtractDays(date, SUBSTRACT_ONE_DAY);
		startDate = new_date;
		endDate = new_date;
	} else if (range === 'last_7_days') {
		const new_date = subtractDays(date, SUBSTRACT_SIX_DAY);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_14_days') {
		const new_date = subtractDays(date, SUBSTRACT_THIRTEEN_DAY);
		startDate = new_date;
		endDate = date;
	} else if (range === 'last_month') {
		const firstDay = new Date(date.getFullYear(), date.getMonth() - LAST_AND_FIRST_MONTH, LAST_AND_FIRST_MONTH);
		const lastDay = new Date(date.getFullYear(), date.getMonth(), LAST_DAY);
		startDate = firstDay;
		endDate = lastDay;
	} else if (range === 'current_month') {
		const firstDay = new Date(date.getFullYear(), date.getMonth(), LAST_AND_FIRST_MONTH);
		startDate = firstDay;
		endDate = date;
	}

	return { startDate, endDate };
};

export default datesMapping;
