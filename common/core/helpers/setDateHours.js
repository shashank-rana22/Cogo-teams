const DAY_START_HOUR = 0;
const DAY_START_MINUTE = 0;
const DAY_START_SECOND = 0;
const DAY_END_HOUR = 23;
const DAY_END_MINUTE = 59;
const DAY_END_SECOND = 59;

const setDateHours = ({ time = 'dayStartTime', date, defaultValue = true }) => {
	let newDate = new Date(date);

	if (newDate.toDateString() === 'Invalid Date') {
		if (defaultValue) {
			newDate = new Date();
		} else {
			return null;
		}
	}

	switch (time) {
		case 'dayStartTime':
			newDate.setHours(DAY_START_HOUR, DAY_START_MINUTE, DAY_START_SECOND);
			break;

		case 'dayEndTime':
			newDate.setHours(DAY_END_HOUR, DAY_END_MINUTE, DAY_END_SECOND);
			break;

		default:
			break;
	}
	return newDate;
};
export default setDateHours;
