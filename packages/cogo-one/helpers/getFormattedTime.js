const MINUTE_TO_MILLISECOND = 60000;
const DECIMAL_VALUE = 0;

export default function getFormattedTime({ time, unit }) {
	return Object.entries(time).reduce((convertedTime, [key, value]) => {
		const updatedTime = { ...convertedTime };
		if (unit === 'minute') {
			updatedTime[key] = Number((value / MINUTE_TO_MILLISECOND).toFixed(DECIMAL_VALUE));
		} else if (unit === 'millisecond') {
			updatedTime[key] = Number((value * MINUTE_TO_MILLISECOND).toFixed(DECIMAL_VALUE));
		}
		return updatedTime;
	}, {});
}
