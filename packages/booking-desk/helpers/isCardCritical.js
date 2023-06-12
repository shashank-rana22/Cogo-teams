import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';

const getDaysLaterDate = (daysLater = '') => {
	const daysLaterDate = new Date();

	daysLaterDate.setDate(daysLaterDate.getDate() + NUMERICAL_VALUES.days_later_date[daysLater]);
	daysLaterDate.setHours(...NUMERICAL_VALUES.day_end_time);

	return daysLaterDate;
};

export default function isCritical({ item = {}, activeTab = '' }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;
	const bnExpiryDate = new Date(item?.bn_expiry);

	const oneDayLater = getDaysLaterDate('one_day_later');
	const threeDaysLater = getDaysLaterDate('three_days_later');

	let critical = false;

	if (activeTab === 'container_pick_up') {
		critical = item?.bn_expiry && bnExpiryDate < oneDayLater;
	} else {
		critical = departDate && new Date(departDate) <= threeDaysLater;
	}

	return critical;
}
