import currencies from '../utils/currencies';

const childControls = ({ heading = '' }) => {
	const name = heading ? 'local_line_items' : 'line_items';

	const controls = {
		type        : 'fieldArray',
		showButtons : true,
		name,
		heading,
		value       : [
			{
				code             : '',
				price            : '',
				currency         : 'USD',
				min_price        : '',
				cbm_weight_ratio : '',
				unit             : '',
			},
		],
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'code',
				type        : 'select',
				span        : 4,
				label       : 'Charge Code',
				placeholder : 'Charge Name',
				valueKey    : 'code',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				span        : 1.5,
				type        : 'number',
				label       : 'Price',
				min         : 0,
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
				name        : 'min_price',
				label       : 'Minimum Price',
				type        : 'number',
				span        : 3,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'cbm_weight_ratio',
				label       : 'Weight Ratio',
				type        : 'number',
				placeholder : 'Type Weight Ratio',
				rules       : { required: 'This is required' },
				span        : 3,
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : 2,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
		],
	};
	return controls;
};

export default childControls;
