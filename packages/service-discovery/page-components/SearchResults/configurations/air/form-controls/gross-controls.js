import validate from '../../../utils/validateNumber';

export const GROSS_CONTROLS = [
	{
		name           : 'packages_count',
		label          : 'No. of Units',
		type           : 'input',
		optionsListKey : 'container-sizes',
		span           : 4,
		value          : '1',
		rules          : {
			required : 'Count is required',
			validate : (val) => validate(val),
			max      : 10000,
			min      : 1,
		},
	},
	{
		name           : 'package_type',
		label          : 'Unit Type',
		type           : 'select',
		optionsListKey : 'package-types',
		span           : 8,
		value          : 'box',
		rules          : { required: 'Package type is required' },
	},
	{
		name             : 'volume',
		label            : 'Total Volume',
		showTopLabelOnly : true,
		span             : 6,
		controls         : [
			{
				name  : 'volume',
				type  : 'input',
				span  : 4,
				value : 1,
				rules : {
					required : 'Volume is required',
					validate : (val) => validate(val),
					max      : 30,
					min      : 0.001,
				},
			},
			{
				name        : 'volume_unit',
				type        : 'select',
				placeholder : 'Select Unit',
				span        : 8,
				value       : 'cbm',
				options     : [
					{
						label : 'CBM',
						value : 'cbm',
					},
					{
						label : 'CC',
						value : 'cc',
					},
					{
						label : 'CFT',
						value : 'cft',
					},
				],
			},
		],
	},
	{
		name             : 'weight',
		label            : 'Total Weight',
		showTopLabelOnly : true,
		span             : 6,
		controls         : [
			{
				name  : 'weight',
				type  : 'input',
				span  : 4,
				value : 1,
				rules : {
					required : 'Weight is required',
					validate : (val) => validate(val),
					max      : 30,
					min      : 0.000000001,
				},
			},
			{
				name        : 'weight_unit',
				type        : 'select',
				placeholder : 'Select Unit',
				span        : 8,
				value       : 'kg',
				options     : [
					{
						label : 'KG',
						value : 'kg',
					},
					{
						label : 'LB',
						value : 'lb',
					},
				],
			},
		],
	},
	{
		name    : 'stackability',
		type    : 'chips',
		span    : 10,
		value   : 'stackable',
		options : [
			{
				label : 'Stackable',
				value : 'stackable',
			},
			{
				label : 'Non-stackable',
				value : 'non_stackable',
			},
		],
		rules: { required: 'This is required' },
	},
	{
		name  : 'packing_list',
		label : 'Packing List (OPTIONAL)',
		type  : 'file',
	},
];
