import { addDays } from '@cogoport/utils';

const TODAY = new Date();

const importCondition = { schedule_arrival_less_than: addDays(TODAY, 2) };
const exportCondition = { gated_in_less_than: TODAY, pending_gate_in: true };

const CRITICAL_FILTER = {
	fcl_freight: {
		import: {
			assigned    : importCondition,
			in_progress : importCondition,
		},
		export: {
			assigned    : exportCondition,
			in_progress : exportCondition,
		},
	},
};

export default CRITICAL_FILTER;
