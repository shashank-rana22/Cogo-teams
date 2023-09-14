export const getDateFromTime = (timeStr = '00:00:00') => {
	const [hr, mn, sc] = timeStr.split(':');
	const currentTime = new Date();
	currentTime.setHours(hr);
	currentTime.setMinutes(mn);
	currentTime.setSeconds(sc);
	return currentTime;
};
