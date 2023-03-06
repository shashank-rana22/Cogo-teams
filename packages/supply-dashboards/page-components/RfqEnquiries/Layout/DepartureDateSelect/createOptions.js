import { addDays, format } from '@cogoport/utils';

const createOptions = (datePair) => {
	const newStartDate = datePair.startDate ? new Date(datePair.startDate) : new Date();
	const newEndDate = datePair.endDate ? new Date(datePair.endDate) : addDays(new Date(), 60);
	let weekDate = addDays(newStartDate, 6);
	const weeks = [];
	let firstStartDate = newStartDate;
	if (weekDate > newEndDate) {
		const datesForThisWeek = [];
		let i = 0;
		while (firstStartDate <= newEndDate) {
			datesForThisWeek.push({
				children: `${format((firstStartDate), 'PP')} ${format(
					(firstStartDate),
					'EEE',
				)}`,
				key: (firstStartDate),
			});
			i += 1;
			firstStartDate = addDays(firstStartDate, i);
		}
		weeks.push(datesForThisWeek);
		return weeks;
	}

	while (weekDate <= newEndDate) {
		let datesForThisWeek = [];
		let date = firstStartDate;
		datesForThisWeek.push({
			children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
			key      : (date),
		});
		for (let i = 1; i < 7 && date <= newEndDate; i += 1) {
			date = addDays(firstStartDate, i);
			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});
		}
		firstStartDate = addDays(weekDate, 1);
		weeks.push(datesForThisWeek);
		weekDate = addDays(firstStartDate, 6);
		if (weekDate > newEndDate) {
			datesForThisWeek = [];
			date = firstStartDate;
			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});
			for (let i = 1; i < 7 && date < newEndDate; i += 1) {
				date = addDays(firstStartDate, i);
				datesForThisWeek.push({
					children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
					key      : (date),
				});
			}
			weeks.push(datesForThisWeek);
		}
	}

	return weeks;
};

export default createOptions;
