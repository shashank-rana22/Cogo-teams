const controls = [
	{
		name  : 'zone_name',
		label : 'Enter Zone name',
		type  : 'text',
		span  : 6,
		rules : {
			required: 'This is required',
		},
	},
	{
		name  : 'commodity_type',
		label : 'Select Commodity type',
		type  : 'select',
		span  : 6,

		options: [
			{
				label : 'General',
				value : 'general',
			},
			{
				label : 'Dangerous',
				value : 'dangerous',
			},
		],
		rules: { required: 'This is required' },
	},
	{
		name               : 'aisle',
		type               : 'fieldArray',
		showButtons        : true,
		label              : '+ Add More Aisle',
		buttonText         : 'Add More Aisle',
		noDeleteButtonTill : 1,

		controls: [
			{
				label : 'Enter number of aisle of this type',
				name  : 'no_of_aisle',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Racks',
				name  : 'no_of_racks',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Shelves/racks',
				name  : 'no_of_shelves_by_racks',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of bins in shelf',
				name  : 'no_of_bins_in_shelf',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Bins',
				name  : 'no_of_bins',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label       : 'Length',
				name        : 'length',
				span        : 2,
				type        : 'number',
				placeholder : 'Length',
				rules       : { required: 'Required' },
			},
			{
				label       : 'Width',
				name        : 'width',
				span        : 2,
				type        : 'number',
				placeholder : 'Width',
				rules       : { required: 'Required' },
			},
			{
				label       : 'Height',
				name        : 'height',
				span        : 2,
				type        : 'number',
				placeholder : 'Height',
				rules       : { required: 'Required' },
			},
		],
	},
];
export default controls;
