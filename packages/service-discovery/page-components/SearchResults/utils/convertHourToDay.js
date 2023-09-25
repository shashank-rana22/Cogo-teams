const DEFAULT_ZERO_VALUE = 0;

const HOURS_IN_ONE_DAY = 24;

const convertHourToDay = (time) => {
	if (time >= HOURS_IN_ONE_DAY) {
		const t = Math.floor(time / HOURS_IN_ONE_DAY);
		const r = time % HOURS_IN_ONE_DAY;
		if (r === DEFAULT_ZERO_VALUE) {
			return `${t} Day(s) `;
		}
		return `${t} Day(s) ${r} Hour(s) `;
	}
	return `${time} Hour(s)`;
};
export default convertHourToDay;
