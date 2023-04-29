function getWeekDates() {
	const d = new Date();
	const day = d.getDay();
	const startdiff = d.getDate() - day + (day === 0 ? -6 : 1);
	const enddiff = d.getDate() + 7 - day + (day === 0 ? -6 : 1);
	return {
		startDate : new Date(new Date(d.setDate(startdiff)).setHours(0, 0, 0, 0)),
		endDate   : new Date(new Date(d.setDate(enddiff)).setHours(23, 59, 59, 59)),
	};
}
export default getWeekDates;
