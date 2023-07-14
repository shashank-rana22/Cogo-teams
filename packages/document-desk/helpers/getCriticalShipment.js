import { addDays, subtractDays } from '@cogoport/utils';

const getCriticalShipment = ({ tab, shipment }) => {
	const { estimated_arrival, estimated_departure, cutoffs:{ si_cutoff = '' } = {} } = shipment || {};
	if (!estimated_arrival) return false;

	const TODAY = new Date(new Date().setHours(23, 59, 59, 999));
	const timezoneOffset = TODAY.getTimezoneOffset();

	const estimated_arr = new Date(new Date(estimated_arrival).getTime() + timezoneOffset);
	const si_cutoff_date = new Date(new Date(si_cutoff).getTime() + timezoneOffset);
	const estimated_dep = new Date(new Date(estimated_departure).getTime() + timezoneOffset);

	const criticalMapping = {
		confirmed_by_service_provider : si_cutoff ? addDays(TODAY, 1) > si_cutoff_date : false,
		do_approval_pending           : estimated_dep <= TODAY,
		bl_approval_pending           : estimated_dep <= TODAY,
		vessel_departed               : estimated_arr <= subtractDays(TODAY, 1),
	};

	return criticalMapping[tab];
};

export default getCriticalShipment;
