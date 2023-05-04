import { addDays } from '@cogoport/utils';

const TODAY = new Date();

const CRITICAL_FILTER = {
	fcl_freight: {
		import: {
			assigned    : { schedule_arrival_less_than: addDays(TODAY, 2) },
			in_progress : { schedule_arrival_less_than: addDays(TODAY, 2) },
		},
		export: {
			assigned    : {	gated_in_less_than: TODAY },
			in_progress : {	gated_in_less_than: TODAY },
		},
	},
};

export default CRITICAL_FILTER;
