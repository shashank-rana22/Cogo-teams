import { addDays } from '@cogoport/utils';

function getCriticalShipment({ contextValues, shipment }) {
	const { shipmentType, stepperTab, activeTab } = contextValues || {};
	const { schedule_arrival, gate_in_cutoff, is_gated_in } = shipment || {};

	const TODAY = new Date(new Date().setHours(23, 59, 59, 999));
	const timezoneOffset = TODAY.getTimezoneOffset();
	const sch_arr = new Date(new Date(schedule_arrival).getTime() + timezoneOffset);
	const gateInCutoff = new Date(new Date(gate_in_cutoff).getTime() + timezoneOffset);

	const importCond = schedule_arrival ? sch_arr < addDays(TODAY, 2) : false;
	const exportCond = gate_in_cutoff && !is_gated_in ? gateInCutoff < TODAY : false;

	const mapping = {
		fcl_freight: {
			import: {
				assigned    : importCond,
				in_progress : importCond,
			},
			export: {
				assigned    : exportCond,
				in_progress : exportCond,
			},
		},
	};

	return !!mapping[shipmentType]?.[stepperTab]?.[activeTab];
}
export default getCriticalShipment;
