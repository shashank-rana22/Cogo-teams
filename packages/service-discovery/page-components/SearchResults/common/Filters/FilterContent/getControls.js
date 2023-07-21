import fclControls from '../../../configurations/fcl/form-controls';
import haulageControls from '../../../configurations/haulage-freight/form-controls';
import lclControls from '../../../configurations/lcl/form-controls';
import trailerControls from '../../../configurations/trailer/form-controls';

import EXTRA_FILTERS from './extra-filter-controls';

export const MAIN_CONTROLS_MAPPING = {
	fcl_freight: {
		label         : 'Container Details',
		mainControls  : fclControls,
		extraControls : [
			'shipping_line_id',
			'detention_demurrage',
			'source',
			'shipment_type',
			'payment_term',
			'offers',
		],
	},
	lcl_freight: {
		label         : 'Package Details',
		mainControls  : lclControls,
		extraControls : [
			'shipping_line_id',
			'detention_demurrage',
			'source',
			'shipment_type',
			'payment_term',
			'offers',
		],
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

const getFilterControls = (
	data,
	service_key = 'primary_service',
	showLoadControlsOnly = false,
	showFiltersOnly = false,
) => {
	const service_type = data[service_key];

	const { label, mainControls, extraControls } = MAIN_CONTROLS_MAPPING[service_type];

	const ifShowMainControlsOnly = (y, n) => (showLoadControlsOnly ? y : n);
	const ifShowFiltersOnly = (y, n) => (showFiltersOnly ? y : n);

	const finalControls = [
		...ifShowFiltersOnly([], [
			{
				label,
				controls: mainControls(),
			},
		]),
		...ifShowMainControlsOnly([], extraControls.map((item) => EXTRA_FILTERS[item])),
	];
	return finalControls;
};
export default getFilterControls;
