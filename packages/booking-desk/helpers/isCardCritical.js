import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';

const timezoneOffset = new Date().getTimezoneOffset() * NUMERICAL_VALUES.sixty * NUMERICAL_VALUES.thousand;

export default function isCritical({ item = {}, activeTab = '' }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;
	const bnExpiryDate = new Date(item?.bn_expiry);

	const oneDayLater = new Date();
	oneDayLater.setDate(oneDayLater.getDate() + NUMERICAL_VALUES.one);
	oneDayLater.setHours(
		NUMERICAL_VALUES.twenty_three,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.tripple_nine,
	);

	const threeDaysLater = new Date();
	threeDaysLater.setDate(threeDaysLater.getDate() + NUMERICAL_VALUES.three);
	threeDaysLater.setHours(
		NUMERICAL_VALUES.twenty_three,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.tripple_nine,
	);

	let critical = false;

	if (activeTab === 'container_pick_up') {
		critical = item?.bn_expiry && bnExpiryDate < oneDayLater;
	} else {
		critical = departDate && new Date(new Date(departDate).getTime() + timezoneOffset) <= threeDaysLater;
	}

	return critical;
}
