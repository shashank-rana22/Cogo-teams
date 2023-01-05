import currencies from '../utils/currencies';

const childControls = ({ heading = '' }) => 	{
	let name = heading ? 'origin_line_items' : 'line_items';
	if (heading === 'add_destination_local_charges') {
		name = 'destination_line_items';
	}
	const controls = 		{
		type        : 'fieldArray',
		name,
		showButtons : true,
		heading,
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
				label       : 'Minimum Price per shipment',
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
