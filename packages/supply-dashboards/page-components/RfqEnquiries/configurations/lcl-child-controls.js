import currencies from '../utils/currencies';

const childControls = ({ heading }) => {
	const controls = {
		type        : 'fieldArray',
		showButtons : true,
		name        : 'line_items',
		heading,
		value       : [
			{
				code             : '',
				price            : null,
				currency         : 'USD',
				min_price        : null,
				cbm_weight_ratio : null,
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
				name        : 'min_price',
				label       : 'Minimum Price',
				type        : 'text',
				span        : 3,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'cbm_weight_ratio',
				label       : 'Weight Ratio',
				type        : 'text',
				placeholder : 'Type Weight Ratio',
				rules       : { required: 'This is required' },
				span        : 3,
			},
			{
				name         : 'unit',
				label        : 'Unit',
				type         : 'select',
				span         : 3,
				caret        : true,
				showToolTip  : true,
				placeholder  : 'Unit',
				popoverWidth : '172px',
				rules        : { required: 'This is required' },
			},
		],
	};
	return controls;
};

export default childControls;
