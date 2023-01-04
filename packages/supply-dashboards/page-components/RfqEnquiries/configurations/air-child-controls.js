import currencies from '../utils/currencies';

const childControls = ({ heading }) => 	{
	const controls = 		{
		type        : 'fieldArray',
		showButtons : true,
		name        : 'line_items',
		heading,
		value       : [
			{
				code      : '',
				price     : null,
				currency  : 'USD',
				min_price : null,
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
				label       : 'Minimum Price per shipment',
				type        : 'text',
				span        : 2,
				min         : 0,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'remarks',
				placeholder : 'Remarks',
				type        : 'text',
				className   : 'primary lg',
				span        : 1,
			},
		],
	};
	return controls;
};

export default childControls;
