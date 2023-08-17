import { addDays } from '@cogoport/utils';

import { GROSS_CONTROLS } from './gross-controls';
import { PACKAGE_CONTROLS } from './package-controls';

const DATE_RANGE = 1;

const tomorrow = addDays(new Date(), DATE_RANGE);

const COMMODITY_OPTIONS = [
	{ label: 'General Cargo', value: 'general' },
	{ label: 'Dangerous Goods', value: 'dangerous' },
	{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
	{ label: 'Other Special Commodity Type', value: 'other_special' },
];

const CONTROLS_MAPPING = {
	by_gross   : GROSS_CONTROLS,
	by_package : PACKAGE_CONTROLS,
};

const airControls = ({ activeTab = '' }) => {
	const controls = CONTROLS_MAPPING[activeTab] || [];

	const COMMON_CONTROLS = [
		{
			name  : 'cargo_date',
			label : 'Cargo Readiness Date',
			type  : 'datepicker',
			value : tomorrow,
			span  : 12,
			rules : { required: 'This is required' },
		},
		{
			name    : 'commodity',
			label   : 'Commodity',
			type    : 'select',
			options : COMMODITY_OPTIONS,
			value   : 'general',
			span    : 12,
			rules   : { required: 'Commodity is required' },
		},
		{
			name    : 'commodity_subtype',
			label   : 'Commodity Subtype',
			type    : 'select',
			// options : commoditySubtypeOptions,
			options : [
				{
					label   : 'hello',
					options : [
						{
							label : 'first',
							value : 'first',
						},
					],
				},
			],
			span  : 12,
			rules : { required: 'This is required' },
		},
	];

	return [...controls, ...COMMON_CONTROLS] || [];
};
export default airControls;
