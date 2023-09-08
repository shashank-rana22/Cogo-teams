const controls = [
	{
		name        : 'zoneName',
		label       : 'Zone name',
		placeholder : 'Enter Zone name',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'commodity',
		label       : 'Commodity type',
		placeholder : 'Select Commodity type',
		type        : 'select',
		span        : 6,
		value       : 'general',
		options     : [
			{
				label : 'General',
				value : 'general',
			},
			{
				label : 'Dangerous',
				value : 'dangerous',
			},
			{
				label : 'Special Commodity',
				value : 'special_commodity',
			},
			{
				label : 'Temperature controlled pharma',
				value : 'temperature_controlled_pharma',
			},
		],
		rules: { required: true },
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
				label       : 'Aisle',
				placeholder : 'Enter number of aisle of this type',
				name        : 'aislesCount',
				span        : 6,
				type        : 'number',

				rules: { required: true },
			},
			{
				label       : 'Racks',
				placeholder : 'Enter number of Racks',
				name        : 'racksCount',
				span        : 6,
				type        : 'number',

				rules: { required: true },
			},
			{
				label       : 'Shelves/Racks',
				placeholder : 'Enter number of Shelves/Racks',
				name        : 'shelvesCount',
				span        : 6,
				type        : 'number',

				rules: { required: true },
			},
			{
				label       : 'Bins in Shelf',
				placeholder : 'Enter number of bins in shelf',
				name        : 'totalBinsInShelf',
				span        : 6,
				type        : 'number',

				rules: { required: true },
			},
			{
				label       : 'Bins',
				placeholder : 'Enter number of Bins',
				name        : 'binsCount',
				span        : 6,
				type        : 'number',

				rules: { required: true },
			},
			{
				label       : 'Length',
				name        : 'binLength',
				span        : 2,
				type        : 'number',
				placeholder : 'Length',
				rules       : { required: true },
			},
			{
				label       : 'Width',
				name        : 'binWidth',
				span        : 2,
				type        : 'number',
				placeholder : 'Width',
				rules       : { required: true },
			},
			{
				label       : 'Height',
				name        : 'binHeight',
				span        : 2,
				type        : 'number',
				placeholder : 'Height',
				rules       : { required: true },
			},
		],
	},
];
export default controls;
