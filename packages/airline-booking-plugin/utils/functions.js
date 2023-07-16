import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const functions = () => ({
	handleSource: (singleItem) => (
		singleItem?.source?.name
	),
	handleDestination: (singleItem) => (
		singleItem?.destination?.name
	),
	handleFlightDate: (singleItem) => {
		const { flight_date } = singleItem || {};
		return (
			<>
				{formatDate({
					date       : flight_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</>
		);
	},
	handleFlightStatus: (singleItem) => (
		singleItem?.air_india_awb_number?.flight_status
	),
	handleAWBNumber: (singleItem) => (
		singleItem?.air_india_awb_number?.awb_number
	),
});

export default functions;
