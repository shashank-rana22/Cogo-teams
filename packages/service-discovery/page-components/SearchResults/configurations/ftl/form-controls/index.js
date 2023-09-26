import { addDays } from '@cogoport/utils';

import CARGO_GROSS_CONTROLS from './gross-controls';
import CARGO_PACKAGE_CONTROLS from './package-controls';
import TRUCKS_CONTROLS from './trucks-controls';

const DATE_RANGE = 1;
const tomorrow = addDays(new Date(), DATE_RANGE);

const CONTROLS_MAPPING = {
	truck             : TRUCKS_CONTROLS,
	cargo_gross       : CARGO_GROSS_CONTROLS,
	cargo_per_package : CARGO_PACKAGE_CONTROLS,
};

const ftlControls = ({ activeTab = '', cargoType = '' }) => {
	const activeControls = activeTab === 'truck' ? activeTab : cargoType;

	const controls = CONTROLS_MAPPING[activeControls] || [];

	const COMMON_CONTROLS = [
		{
			name  : 'cargo_clearance_date',
			label : 'Cargo Readiness Date',
			type  : 'datepicker',
			value : tomorrow,
			span  : 12,
			rules : { required: 'This is required' },
		},
	];

	return [...controls, ...COMMON_CONTROLS] || [];
};

export default ftlControls;
