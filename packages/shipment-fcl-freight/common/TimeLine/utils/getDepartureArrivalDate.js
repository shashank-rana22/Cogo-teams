export function getDepartureArrivalDate(primary_service = {}, key = '') {
	const {
		schedule_departure,
		selected_schedule_departure,
		schedule_arrival,
		selected_schedule_arrival,
	} = primary_service || {};

	const datesMapping = {
		arrival   : schedule_arrival || selected_schedule_arrival,
		deparutre : schedule_departure || selected_schedule_departure,
	};

	return datesMapping[key];
}
