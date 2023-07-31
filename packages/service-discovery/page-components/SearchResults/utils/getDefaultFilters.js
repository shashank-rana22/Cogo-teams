import { addDays } from '@cogoport/utils';

const EXTRA_FILTERS_DEFAULT_VALUES = {
	operator_type        : 'all',
	cargo_readiness_date : addDays(new Date(), 1),
	source               : 'all',
	payment_term         : 'all',
	offers               : 'all',
	shipping_line_id     : [],
	schedule_type        : '',
};

const getDefaultFilters = (filtersArray) => {
	let resultObj = {};

	(filtersArray || []).forEach((item) => {
		resultObj = {
			...resultObj,
			[item]: EXTRA_FILTERS_DEFAULT_VALUES[item],
		};
	});

	return resultObj;
};
export default getDefaultFilters;
