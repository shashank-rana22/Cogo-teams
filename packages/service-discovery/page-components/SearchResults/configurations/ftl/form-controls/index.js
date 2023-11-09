import { addDays } from '@cogoport/utils';

import getGrossControls from './gross-controls';
import getPerPackageControls from './package-controls';
import getTrucksControls from './trucks-controls';

const DATE_RANGE = 1;
const tomorrow = addDays(new Date(), DATE_RANGE);

const CONTROLS_MAPPING = {
	truck             : getTrucksControls,
	cargo_gross       : getGrossControls,
	cargo_per_package : getPerPackageControls,
};

const ftlControls = ({
	activeTab = '',
	cargoType = '',
	formValues = {},
	setValue = () => {},
}) => {
	const activeControls = activeTab === 'truck' ? activeTab : cargoType;

	const controlProps = {
		formValues,
		setValue,
	};

	const controls = CONTROLS_MAPPING[activeControls]?.(controlProps) || [];

	const COMMON_CONTROLS = [
		{
			name  : 'cargo_readiness_date',
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
