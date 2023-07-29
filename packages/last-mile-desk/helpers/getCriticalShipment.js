import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays, subtractDays } from '@cogoport/utils';

const TWO = 2;
const TWENTY_THREE = 23;
const FIFTY_NINE = 59;
const NINE_HUNDRED_NINETY_NINE = 999;
const getCriticalShipment = ({ tab, shipment }) => {
	const {
		free_days_detention_destination:freedays = GLOBAL_CONSTANTS.zeroth_index,
		estimated_arrival,
	} = shipment || {};
	if (!estimated_arrival) return false;

	const TODAY = new Date(new Date().setHours(TWENTY_THREE, FIFTY_NINE, FIFTY_NINE, NINE_HUNDRED_NINETY_NINE));
	const timezoneOffset = TODAY.getTimezoneOffset();

	const estimated_arr = new Date(new Date(estimated_arrival).getTime() + timezoneOffset);

	const criticalMapping = {
		vessel_departed     : estimated_arr <= TODAY,
		vessel_arrived      : addDays(TODAY, TWO) >= estimated_arr,
		container_gated_out : subtractDays(TODAY, (freedays || GLOBAL_CONSTANTS.zeroth_index) - TWO) >= estimated_arr,
		container_return    : subtractDays(TODAY, (freedays || GLOBAL_CONSTANTS.zeroth_index) - TWO) >= estimated_arr,

	};

	return criticalMapping[tab];
};

export default getCriticalShipment;
