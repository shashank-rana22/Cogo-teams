import currencies from '../utils/currencies';

const chargeControls = ({ heading = '' }) => {
	const name = heading ? 'local_line_items' : 'line_items';

	const controls = 		{
		name,
		type  : 'fieldArray',
		heading,
		value : [
			{
				code     : 'BAS',
				unit     : '',
				currency : 'USD',
				price    : '',
			},
		],
		showButtons        : true,
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'code',
				caret       : true,
				type        : 'select',
				valueKey    : 'code',
				labelKey    : 'label',
				placeholder : 'Select Charge',
				className   : 'primary lg',
				span        : 3,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : 2,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				placeholder : 'Currency',
				name        : 'currency',
				type        : 'select',
				span        : 3,
				options     : currencies,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				type        : 'number',
				span        : 3,
				placeholder : 'Price Per Unit',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
		],
	};

	return controls;
};
export default chargeControls;
