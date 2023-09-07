import { addDays, subtractDays } from '@cogoport/utils';

const TODAY_HOURS = 23;
const TODAY_MINUTES_OR_SEC = 59;
const TODAY_MS = 999;
const TWO = 2;
const ONE = 1;

const getCriticalShipment = ({ tab, shipment }) => {
	const { estimated_arrival, estimated_departure, cutoffs = {}, si_filed_at = '' } = shipment || {};
	const { si_cutoff = '' } = cutoffs;

	if (!estimated_arrival) return false;

	const TODAY = new Date(new Date().setHours(TODAY_HOURS, TODAY_MINUTES_OR_SEC, TODAY_MINUTES_OR_SEC, TODAY_MS));
	const timezoneOffset = TODAY.getTimezoneOffset();

	const estimated_arr = new Date(new Date(estimated_arrival).getTime() + timezoneOffset);
	const si_cutoff_date = new Date(new Date(si_cutoff).getTime() + timezoneOffset);
	const si_filed_date = new Date(new Date(si_filed_at).getTime() + timezoneOffset);
	const estimated_dep = new Date(new Date(estimated_departure).getTime() + timezoneOffset);

	const criticalMapping = {
		upload_shipping_instruction   : si_cutoff ? subtractDays(TODAY, TWO) >= si_cutoff_date : false,
		upload_draft_bil_of_lading    : si_filed_at ? addDays(TODAY, ONE) >= si_filed_date : false,
		confirmed_by_service_provider : si_cutoff ? addDays(TODAY, ONE) > si_cutoff_date : false,
		do_approval_pending           : estimated_dep <= TODAY,
		bl_approval_pending           : estimated_dep <= TODAY,
		vessel_departed               : estimated_arr <= subtractDays(TODAY, ONE),
	};

	return criticalMapping[tab];
};

export default getCriticalShipment;
