import { addDays, subtractDays } from '@cogoport/utils';

const TODAY_HOURS = 23;
const TODAY_SEC = 59;
const TODAY_MINUTES = 59;
const TODAY_MS = 999;

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

const getCriticalShipment = ({ tab, shipment }) => {
	const { estimated_arrival = '', estimated_departure = '', cutoffs = {}, si_filed_at = '' } = shipment || {};
	const { document_amendment_requested = '' } = shipment || {};
	const { si_cutoff = '', gate_in_cutoff = '' } = cutoffs;

	if (!estimated_arrival) return false;

	const TODAY = new Date(new Date().setHours(TODAY_HOURS, TODAY_MINUTES, TODAY_SEC, TODAY_MS));
	const timezoneOffset = TODAY.getTimezoneOffset();

	const estimated_arr = new Date(new Date(estimated_arrival).getTime() + timezoneOffset);
	const si_cutoff_date = new Date(new Date(si_cutoff).getTime() + timezoneOffset);
	const gate_in_cutoff_date = new Date(new Date(gate_in_cutoff).getTime() + timezoneOffset);
	const si_filed_date = new Date(new Date(si_filed_at).getTime() + timezoneOffset);
	const estimated_dep = new Date(new Date(estimated_departure).getTime() + timezoneOffset);

	const amend_draft_bl_condition = (document_amendment_requested === true) && (estimated_dep <= addDays(TODAY, FOUR));

	const telex_dep = estimated_dep <= subtractDays(TODAY, FIVE);
	const telex_arr = estimated_arr <= addDays(TODAY, FOUR);
	const telex_condition = telex_dep && telex_arr;

	const criticalMapping = {
		upload_shipping_instruction   : si_cutoff ? addDays(TODAY, TWO) >= si_cutoff_date : false,
		upload_draft_bil_of_lading    : si_filed_at ? subtractDays(TODAY, ONE) >= si_filed_date : false,
		confirmed_by_service_provider : si_cutoff ? addDays(TODAY, ONE) > si_cutoff_date : false,
		bl_approval_pending           : estimated_dep <= TODAY,
		do_approval_pending           : estimated_dep <= TODAY,
		vessel_departed               : estimated_arr <= subtractDays(TODAY, ONE),

		do_approval_pending_import               : gate_in_cutoff ? addDays(TODAY, ONE) >= gate_in_cutoff_date : false,
		confirmed_by_service_provider_import     : si_cutoff ? addDays(TODAY, THREE) >= si_cutoff_date : false,
		vessel_departed_import                   : estimated_dep <= TODAY,
		amendment_requested_by_importer_exporter : amend_draft_bl_condition,
		pre_alerts                               : estimated_dep <= subtractDays(TODAY, TWO),
		agent_invoice                            : estimated_dep <= subtractDays(TODAY, TWO),
		telex                                    : telex_condition,
	};

	return criticalMapping[tab];
};

export default getCriticalShipment;
