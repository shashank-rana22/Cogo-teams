import { addDays, subtractDays } from '@cogoport/utils';

const MONTH_DAYS = 30;

export const DEFAULT_GLOBAL_FILTERS = {
	service_type : 'fcl',
	parent_mode  : null,
	start_date   : subtractDays(new Date(), MONTH_DAYS),
	end_date     : addDays(new Date(), MONTH_DAYS),
	chart_type   : 'trend',
};
