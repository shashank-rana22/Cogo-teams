import { GROSS_CONTROLS } from './gross-controls';
import { PACKAGE_CONTROLS } from './package-controls';

const COMMON_CONTROLS = [
	{
		label   : 'Commodity',
		name    : 'commodity',
		type    : 'select',
		options : [
			{
				label : 'General',
				value : 'general',
			},
			{
				label : 'Dangerous',
				value : 'dangerous',
			},
			{
				label : 'Temp Controlled',
				value : 'temp_controlled',
			},
			{
				label : 'Other Special',
				value : 'other_special',
			},
		],
		span  : 12,
		value : 'general',
		rules : { required: 'Commodity is required' },
	},
];

const CONTROLS_MAPPING = {
	by_gross   : GROSS_CONTROLS,
	by_package : PACKAGE_CONTROLS,
};

const airControls = (activeTab = '') => {
	const controls = CONTROLS_MAPPING[activeTab] || [];

	return [...controls, ...COMMON_CONTROLS] || [];
};
export default airControls;
