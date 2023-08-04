const controls = [
	{
		name  : 'zoneName',
		label : 'Enter Zone name',
		type  : 'text',
		span  : 6,
		rules : {
			required: 'This is required',
		},
	},
	{
		name        : 'commodityType',
		label       : 'Select Commodity type',
		type        : 'select',
		span        : 6,
		value       : 'general',
		initialCall : true,
		params      : {
			service: 'AIR',
		},
		asyncKey    : 'list_hs_code_commodities',
		renderLabel : (item) => (item?.commodityDisplayName),
		rules       : { required: 'This is required' },
	},
	{
		name               : 'aisles',
		type               : 'fieldArray',
		showButtons        : true,
		label              : '+ Add More Aisle',
		buttonText         : 'Add More Aisle',
		noDeleteButtonTill : 1,

		controls: [
			{
				label : 'Enter number of aisle of this type',
				name  : 'aislesCount',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Racks',
				name  : 'racksCount',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Shelves/racks',
				name  : 'shelvesCount',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of bins in shelf',
				name  : 'totalBinsInShelf',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label : 'Enter number of Bins',
				name  : 'binsCount',
				span  : 6,
				type  : 'number',

				rules: { required: 'Required' },
			},
			{
				label       : 'Length',
				name        : 'binLength',
				span        : 2,
				type        : 'number',
				placeholder : 'Length',
				rules       : { required: 'Required' },
			},
			{
				label       : 'Width',
				name        : 'binWidth',
				span        : 2,
				type        : 'number',
				placeholder : 'Width',
				rules       : { required: 'Required' },
			},
			{
				label       : 'Height',
				name        : 'binHeight',
				span        : 2,
				type        : 'number',
				placeholder : 'Height',
				rules       : { required: 'Required' },
			},
		],
	},
];
export default controls;
