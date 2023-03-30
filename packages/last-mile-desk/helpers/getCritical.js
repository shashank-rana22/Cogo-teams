import { addDays, subtractDays } from '@cogoport/utils';

const getCriticalShipment = ({ tab, shipment }) => {
	const { free_days_detention_destination:freedays = 0, estimated_arrival } = shipment || {};
	const TODAY = new Date();

	if (!estimated_arrival) return false;
	const estimated_arr = new Date(estimated_arrival);

	const criticalMapping = {
		vessel_departed           : estimated_arr <= TODAY,
		vessel_arrived            : addDays(TODAY, 2) >= estimated_arr,
		container_gated_out       : subtractDays(TODAY, freedays || 0 - 2) >= estimated_arr,
		awaiting_container_return : subtractDays(TODAY, freedays || 0 - 2) >= estimated_arr,
		container_returned        : subtractDays(TODAY, freedays || 0) >= estimated_arr,
	};
	return criticalMapping[tab];
};

export default getCriticalShipment;
