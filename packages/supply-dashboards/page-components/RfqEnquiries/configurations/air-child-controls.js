import currencies from '../helpers/currencies';

const nameMapping = {
	freights_charge_codes          : 'freights',
	destination_local_charge_codes : 'destination_local',
	origin_local_charge_codes      : 'origin_local',
	customs_charge_codes           : 'line_items',
};

const childControls = ({ heading = '', charge_code_name = '' }) => 	{
	const name = nameMapping[charge_code_name];
	const controls = 		{
		type        : 'fieldArray',
		name,
		showButtons : true,
		heading,
		charge_code_name,
		value       : [
			{
				code      : '',
				price     : '',
				currency  : 'USD',
				min_price : '',
				unit      : '',
			},
		],
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'code',
				type        : 'select',
				span        : 3,
				label       : 'Charge Code',
				placeholder : 'Charge Name',
				valueKey    : 'code',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				span        : 1.5,
				type        : 'text',
				label       : 'Price',
				placeholder : 'Amount',
				rules       : { required: 'This is required' },
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
				name        : 'unit',
				label       : 'Unit',
				type        : 'select',
				span        : 3,
				placeholder : 'Select unit',
				showToolTip : true,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'min_price',
				label       : 'Minimum Price',
				type        : 'text',
				span        : 2,
				min         : 0,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required' },
			},
		],
	};
	return controls;
};

export default childControls;
