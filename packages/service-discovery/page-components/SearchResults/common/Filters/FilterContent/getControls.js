import fclControls from '../../../configurations/fcl/form-controls';
import haulageControls from '../../../configurations/haulage-freight/form-controls';
import lclControls from '../../../configurations/lcl/form-controls';
import trailerControls from '../../../configurations/trailer/form-controls';

import EXTRA_FILTERS from './extra-filter-controls';

export const MAIN_CONTROLS_MAPPING = {
	fcl_freight: {
		label         : 'Container Details',
		mainControls  : fclControls,
		extraControls : ['detention', 'operator', 'readiness_date', 'rate_type', 'payment_type', 'offers'],
	},
	lcl_freight: {
		label         : 'Package Details',
		mainControls  : lclControls,
		extraControls : ['operator', 'readiness_date', 'rate_type', 'payment_type', 'offers'],
	},
	air_freight: {
		label         : 'Container Details',
		mainControls  : fclControls,
		extraControls : [],
	},
	trailer_freight: {
		label         : 'Container Details',
		mainControls  : trailerControls,
		extraControls : [],
	},
	haulage_freight: {
		label         : 'Container Details',
		mainControls  : haulageControls,
		extraControls : [],
	},
	ftl_freight: {
		label         : 'Container Details',
		mainControls  : fclControls,
		extraControls : [],
	},
	ltl_freight: {
		label         : 'Container Details',
		mainControls  : fclControls,
		extraControls : [],
	},
};

const getFilterControls = (data, service_key = 'primary_service') => {
	const service_type = data[service_key];

	const { label, mainControls, extraControls } = MAIN_CONTROLS_MAPPING[service_type];

	const finalControls = [
		{
			label,
			controls: mainControls(),
		},
		...extraControls.map((item) => EXTRA_FILTERS[item]),
	];
	return finalControls;
};
export default getFilterControls;
