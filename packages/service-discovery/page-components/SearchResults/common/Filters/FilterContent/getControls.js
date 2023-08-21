import { EXTRA_FILTERS } from './extra-filter-controls';

export const CONTROLS_MAPPING = {
	fcl_freight: [
		'shipping_line_id',
		'source',
		'schedule_type',
		'payment_term',
	],
	lcl_freight: [
		'shipping_line_id',
		'source',
		'schedule_type',
		'payment_term',
		'offers',
	],
	air_freight: [
		'shipping_line_id',
		'source',
		'schedule_type',
		'payment_term',
		'offers',
	],
};

const getFilterControls = ({
	data = {},
	service_key = 'primary_service',
}) => {
	const service_type = data[service_key];

	if (!service_type) return [];

	const controlsArray = CONTROLS_MAPPING[service_type];

	const controls = controlsArray.map((item) => EXTRA_FILTERS[item]) || [];

	return controls || [];
};
export default getFilterControls;
