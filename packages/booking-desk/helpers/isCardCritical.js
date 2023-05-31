const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export default function isCritical({ item = {}, activeTab = '' }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;
	const bnExpiryDate = new Date(item?.bn_expiry);

	const oneDayLater = new Date();
	oneDayLater.setDate(oneDayLater.getDate() + 1);
	oneDayLater.setHours(23, 59, 59, 999);

	const threeDaysLater = new Date();
	threeDaysLater.setDate(threeDaysLater.getDate() + 3);
	threeDaysLater.setHours(23, 59, 59, 999);

	let critical = false;

	if (activeTab === 'container_pick_up') {
		critical = item?.bn_expiry && bnExpiryDate < oneDayLater;
	} else {
		critical = departDate && new Date(new Date(departDate).getTime() + timezoneOffset) <= threeDaysLater;
	}

	return critical;
}
