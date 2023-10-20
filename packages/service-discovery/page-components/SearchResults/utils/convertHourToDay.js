const DEFAULT_ZERO_VALUE = 0;

const HOURS_IN_ONE_DAY = 24;

const convertHourToDay = (time) => {
	if (time >= HOURS_IN_ONE_DAY) {
		const t = Math.floor(time / HOURS_IN_ONE_DAY);
		const r = time % HOURS_IN_ONE_DAY;
		if (r === DEFAULT_ZERO_VALUE) {
			return `${t} Day${t > 1 ? 's' : ''}`;
		}
		return `${t} Day${t > 1 ? 's' : ''} ${r} Hour${r > 1 ? 's' : ''} `;
	}
	return `${time} Hour${time > 1 ? 's' : ''}`;
};
export default convertHourToDay;
