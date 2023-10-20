export function getDepartureArrivalDate({ shipmentData = {}, key = '' }) {
	const {
		schedule_departure,
		selected_schedule_departure,
		schedule_arrival,
		selected_schedule_arrival,
	} = shipmentData || {};

	const datesMapping = {
		arrival   : schedule_arrival || selected_schedule_arrival,
		departure : schedule_departure || selected_schedule_departure,
	};

	return datesMapping[key];
}
