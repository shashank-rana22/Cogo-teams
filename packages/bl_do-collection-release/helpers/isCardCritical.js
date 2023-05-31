const timezoneOffset = new Date().getTimezoneOffset();

export const isCardCritical = ({ item }) => {
	const { trade_type, arrival, departure } = item || {};

	let isCritical = false;

	if (trade_type === 'export' && departure) {
		const today = new Date();
		today.setHours(23, 59, 59, 999);

		let departureDate = new Date(departure);
		departureDate = departureDate.setMinutes(timezoneOffset);

		isCritical = departureDate <= today;
	} else if (trade_type === 'import' && arrival) {
		const twoDaysLater = new Date();
		twoDaysLater.setDate(twoDaysLater.getDate() + 2);
		twoDaysLater.setHours(23, 59, 59, 999);

		let arrivalDate = new Date(arrival);
		arrivalDate = arrivalDate.setMinutes(timezoneOffset);

		isCritical = arrivalDate <= twoDaysLater;
	}

	return isCritical;
};
