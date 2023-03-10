import currencies from '../helpers/currencies';

const nameMapping = {
	freights_charge_codes          : 'freights',
	destination_local_charge_codes : 'destination_local',
	origin_local_charge_codes      : 'origin_local',
	customs_charge_codes           : 'freights',
};

const childControls = ({ heading = '', charge_code_name }) => {
	const name = nameMapping[charge_code_name];

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
		noDeleteButtonTill : 0,
		controls           : [
			{
				name        : 'code',
				type        : 'select',
				span        : 2,
				label       : 'Charge Code',
				placeholder : 'Charge Name',
				valueKey    : 'code',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				span        : 2,
				type        : 'number',
				label       : 'Price',
				min         : 0,
				placeholder : 'Amount',
				rules       : { required: 'This is required', min: 0 },
			},
			{
				name        : 'currency',
				span        : 1.5,
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
				span        : 2,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required', min: 0 },
			},
			{
				name        : 'cbm_weight_ratio',
				label       : 'Weight Ratio',
				type        : 'number',
				placeholder : 'Type Weight Ratio',
				rules       : { required: 'This is required', min: 0 },
				span        : 2,
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : 1.5,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
		],
	};
	return controls;
};

export default childControls;
