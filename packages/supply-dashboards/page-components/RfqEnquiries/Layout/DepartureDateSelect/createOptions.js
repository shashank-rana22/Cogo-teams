import { addDays, format } from '@cogoport/utils';

const INCREMENT_BY = 1;
const TOTAL_WEEK_DAYS = 7;
const SIX = 6;
const TWO_MONTH_DAYS = 60;

const createOptions = (datePair) => {
	const newStartDate = datePair.startDate ? new Date(datePair.startDate) : new Date();
	const newEndDate = datePair.endDate ? new Date(datePair.endDate) : addDays(new Date(), TWO_MONTH_DAYS);
	let weekDate = addDays(newStartDate, SIX);
	const WEEKS = [];
	let firstStartDate = newStartDate;
	if (weekDate > newEndDate) {
		const DATES_FOR_THIS_WEEK = [];
		let i = 0;
		while (firstStartDate <= newEndDate) {
			DATES_FOR_THIS_WEEK.push({
				children: `${format((firstStartDate), 'PP')} ${format(
					(firstStartDate),
					'EEE',
				)}`,
				key: (firstStartDate),
			});
			i += INCREMENT_BY;
			firstStartDate = addDays(firstStartDate, i);
		}
		WEEKS.push(DATES_FOR_THIS_WEEK);
		return WEEKS;
	}

	while (weekDate <= newEndDate) {
		let datesForThisWeek = [];
		let date = firstStartDate;
		datesForThisWeek.push({
			children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
			key      : (date),
		});
		for (let i = 1; i < TOTAL_WEEK_DAYS && date <= newEndDate; i += INCREMENT_BY) {
			date = addDays(firstStartDate, i);
			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});
		}
		firstStartDate = addDays(weekDate, INCREMENT_BY);
		WEEKS.push(datesForThisWeek);
		weekDate = addDays(firstStartDate, SIX);
		if (weekDate > newEndDate) {
			datesForThisWeek = [];
			date = firstStartDate;
			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});
			for (let i = 1; i < TOTAL_WEEK_DAYS && date < newEndDate; i += INCREMENT_BY) {
				date = addDays(firstStartDate, i);
				datesForThisWeek.push({
					children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
					key      : (date),
				});
			}
			WEEKS.push(datesForThisWeek);
		}
	}

	return WEEKS;
};

export default createOptions;
