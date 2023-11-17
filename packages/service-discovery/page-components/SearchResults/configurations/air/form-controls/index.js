import { addDays, isEmpty } from '@cogoport/utils';

import COMMODITY_SUBTYPE_MAPPING from '../commodity-subtype-mapping';

import { getGrossControls } from './gross-controls';
import { getPackageControls } from './package-controls';

const DATE_RANGE = 1;

const tomorrow = addDays(new Date(), DATE_RANGE);

const COMMODITY_OPTIONS = [
	{ label: 'General Cargo', value: 'general' },
	{ label: 'Dangerous Goods', value: 'dangerous' },
	{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
	{ label: 'Other Special Commodity Type', value: 'other_special' },
];

const COMMODITY_SUBTYPE_DEFAULT_MAPPING = {
	dangerous       : 'Class 1.1',
	temp_controlled : 'active-general_pharma',
	other_special   : 'others',
	general         : 'all',
};

const COMMODITY_SUBTYPE_DEFAULT_OPTIONS = [
	{ label: 'All', value: 'all' },
];

const COMMODITY_SUBTYPE_DEFAULT_VALUE = 'all';

const CONTROLS_MAPPING = {
	cargo_gross       : getGrossControls,
	cargo_per_package : getPackageControls,
};

const airControls = ({
	activeTab = '',
	commoditySubtypeOptions = [],
	setCommoditySubTypeOptions = () => {},
	setValue = () => {},
	selectedWeightType = '',
	setSelectedWeightType = () => {},
}) => {
	const controlProps = {
		selectedWeightType,
		setSelectedWeightType,
		setValue,
	};

	const controls = CONTROLS_MAPPING[activeTab]?.(controlProps) || [];

	const COMMON_CONTROLS = [
		{
			name  : 'cargo_clearance_date',
			label : 'Cargo Readiness Date',
			type  : 'datepicker',
			value : tomorrow,
			span  : 12,
			rules : { required: 'This is required' },
		},
		{
			name     : 'commodity_type',
			label    : 'Commodity',
			type     : 'select',
			options  : COMMODITY_OPTIONS,
			value    : 'general',
			onChange : (val) => {
				setCommoditySubTypeOptions(COMMODITY_SUBTYPE_MAPPING[val] || []);
				setValue('commodity_subtype', COMMODITY_SUBTYPE_DEFAULT_MAPPING[val] || '');
			},
			span  : 6,
			rules : { required: 'Commodity is required' },
		},
		{
			name    : 'commodity_subtype',
			label   : 'Commodity Subtype',
			type    : 'select',
			value   : COMMODITY_SUBTYPE_DEFAULT_VALUE,
			options : !isEmpty(commoditySubtypeOptions) ? commoditySubtypeOptions : COMMODITY_SUBTYPE_DEFAULT_OPTIONS,
			span    : 6,
			rules   : { required: 'This is required' },
		},
	];

	return [...controls, ...COMMON_CONTROLS] || [];
};
export default airControls;
