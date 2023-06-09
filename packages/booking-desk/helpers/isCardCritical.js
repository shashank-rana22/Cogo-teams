import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';

const getDaysLaterDate = (daysLater = '') => {
	const daysLaterDate = new Date();

	daysLaterDate.setDate(daysLaterDate.getDate() + NUMERICAL_VALUES[daysLater]);
	daysLaterDate.setHours(
		NUMERICAL_VALUES.twenty_three,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.tripple_nine,
	);

	return daysLaterDate;
};

export default function isCritical({ item = {}, activeTab = '' }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;
	const bnExpiryDate = new Date(item?.bn_expiry);

	const oneDayLater = getDaysLaterDate('one');
	const threeDaysLater = getDaysLaterDate('three');

	let critical = false;

	if (activeTab === 'container_pick_up') {
		critical = item?.bn_expiry && bnExpiryDate < oneDayLater;
	} else {
		critical = departDate && new Date(departDate) <= threeDaysLater;
	}

	return critical;
}
