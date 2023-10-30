import { isEmpty } from '@cogoport/utils';

const HALF_DAY = 12;
const SECONDS = 0;
const MILLISECONDS = 0;

const getDatefromTime = (timeString) => {
	if (isEmpty(timeString)) {
		return new Date();
	}
	const [time, period] = timeString.split(' ');
	const [hour, minute] = time.split(':');

	let hours = Number(hour);
	if (period === 'pm') {
		hours += HALF_DAY;
	}
	const currentDate = new Date();
	currentDate.setHours(hours, Number(minute), SECONDS, MILLISECONDS);
	return currentDate;
};
export default getDatefromTime;
