import { addDays } from '@cogoport/utils';

const isNextRevenueAllowed = (selectedFilterTab, data, maxEtd = '') => {
	switch (selectedFilterTab) {
		case 'month':
			return `${data?.month}${data?.year}` === maxEtd;

		case 'week': {
			const { day, month, year } = data;
			const date = new Date(`${month} ${day}, ${year}`);
			const nextWeek = addDays(date, 7);
			if (nextWeek > new Date(maxEtd)) {
				return true;
			}
			return false;
		}
		case 'quarter': {
			const { day, month, year } = data;
			const date = new Date(`${month} ${day}, ${year}`);
			const lastMonth = new Date(date.setMonth(date.getMonth() + 5));

			if (lastMonth > new Date(maxEtd)) {
				return true;
			}
			return false;
		}

		default:
			break;
	}
	return false;
};

export default isNextRevenueAllowed;
