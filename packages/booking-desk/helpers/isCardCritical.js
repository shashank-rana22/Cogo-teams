const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export default function isCritical({ item = {} }) {
	const departDate = item.schedule_departure || item.selected_schedule_departure;

	const threeDaysLater = new Date();
	threeDaysLater.setDate(threeDaysLater.getDate() + 3);
	threeDaysLater.setHours(23, 59, 59, 999);

	return departDate && new Date(new Date(departDate).getTime() + timezoneOffset) <= threeDaysLater;
}
