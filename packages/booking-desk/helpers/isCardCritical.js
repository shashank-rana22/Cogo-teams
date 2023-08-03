import setDateHours from '@cogoport/core/helpers/setDateHours';

import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';

const getDaysLaterDate = (daysLater = '') => {
	let daysLaterDate = new Date();

	daysLaterDate.setDate(daysLaterDate.getDate() + NUMERICAL_VALUES.DAYS_LATER[daysLater]);
	daysLaterDate = setDateHours({ date: daysLaterDate, time: '23:59:59:999' });

	return daysLaterDate;
};

export default function isCritical({ item = {}, activeTab = '' }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;
	const bnExpiryDate = new Date(item?.bn_expiry);

	const oneDayLater = getDaysLaterDate('ONE_DAY_LATER');
	const threeDaysLater = getDaysLaterDate('THREE_DAYS_LATER');

	let critical = false;

	if (activeTab === 'container_pick_up') {
		critical = item?.bn_expiry && bnExpiryDate < oneDayLater;
	} else {
		critical = departDate && new Date(departDate) <= threeDaysLater;
	}

	return critical;
}
