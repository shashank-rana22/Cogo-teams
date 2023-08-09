import currencies from './helpers/currencies';

const NAMEMAPPING = {
	freights_charge_codes          : 'line_items',
	destination_local_charge_codes : 'destination_local',
	origin_local_charge_codes      : 'origin_local',
	customs_charge_codes           : 'freights',
};
const CONSTANT_TWO = 2;
const CONSTANT_ZERO = 0;
const CONSTANT_ONE_HALF = 1.5;
const UNITS = [{ label: 'Per kg', value: 'Per kg' }];
const childControls = ({ heading = '', charge_code_name, line_item_data = [] }) => {
	const name = NAMEMAPPING[charge_code_name];
	console.log(line_item_data, 'kkkkk');
	const option = line_item_data?.map((item) => ({ label: item?.code, value: item?.code }));
	console.log(option);
	const controls = {
		type        : 'fieldArray',
		showButtons : true,
		name,
		heading,
		charge_code_name,
		value       : [
			{
				code             : '',
				price            : '',
				currency         : '',
				min_price        : '',
				cbm_weight_ratio : '',
				unit             : '',
			},
		],
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : CONSTANT_ZERO,
		controls           : [
			{
				name           : 'code',
				type           : 'select',
				span           : CONSTANT_TWO,
				options        : option,
				defaultOptions : true,
				label          : 'Charge Code',
				placeholder    : 'Charge Name',
				value          : option[CONSTANT_ZERO]?.value,

			},
			{
				name        : 'price',
				span        : CONSTANT_TWO,
				type        : 'number',
				label       : 'Price',
				min         : CONSTANT_ZERO,
				placeholder : 'Amount',
				rules       : { required: 'This is required', min: CONSTANT_ZERO },
			},
			{
				name        : 'currency',
				span        : CONSTANT_ONE_HALF,
				label       : 'Currency',
				type        : 'select',
				placeholder : 'Curr...',
				options     : currencies,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'min_price',
				label       : 'Minimum Price',
				type        : 'number',
				span        : CONSTANT_TWO,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required', min: CONSTANT_ZERO },
			},
			{
				name        : 'cbm_weight_ratio',
				label       : 'Weight Ratio',
				type        : 'number',
				placeholder : 'Type Weight Ratio',
				rules       : { required: 'This is required', min: CONSTANT_ZERO },
				span        : CONSTANT_TWO,
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : CONSTANT_ONE_HALF,
				className   : 'primary lg',
				options     : UNITS,
				rules       : { required: 'This is required' },
			},
		],
	};
	return controls;
};

export default childControls;
