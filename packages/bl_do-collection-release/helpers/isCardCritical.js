import setDateHours from '@cogoport/core/helpers/setDateHours';

const DAYS = 2;
const timezoneOffset = new Date().getTimezoneOffset();

export const isCardCritical = ({ item, activeTab }) => {
	const { arrival, departure } = item || {};

	let isCritical = false;

	if (activeTab === 'bl' && departure) {
		const todayEnd = setDateHours({ date: new Date(), time: '23:59:59:999' });
		let departureDate = new Date(departure);
		departureDate = departureDate.setMinutes(timezoneOffset);

		isCritical = departureDate <= todayEnd;
	} else if (activeTab === 'do' && arrival) {
		let twoDaysLater = new Date();
		twoDaysLater.setDate(twoDaysLater.getDate() + DAYS);
		twoDaysLater = setDateHours({ date: new Date(), time: '23:59:59:999' });

		let arrivalDate = new Date(arrival);
		arrivalDate = arrivalDate.setMinutes(timezoneOffset);

		isCritical = arrivalDate <= twoDaysLater;
	}

	return isCritical;
};
