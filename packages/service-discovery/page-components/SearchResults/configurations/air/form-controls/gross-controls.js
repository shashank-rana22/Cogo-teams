import validate from '../../../utils/validateNumber';

import TooltipLabel from './TooltipLabel';

export const GROSS_CONTROLS = [
	{
		name           : 'total_quantity',
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
		name  : 'volume',
		label : <TooltipLabel
			labelText="Total Volume"
			tooltipText="For rate calculation, volume will be converted to CBM"
		/>,
		showTopLabelOnly : true,
		span             : 6,
		controls         : [
			{
				name  : 'gross_volume',
				type  : 'input',
				span  : 4,
				value : 1,
				rules : {
					required : 'Volume is required',
					validate : (val) => validate(val),
					min      : 0.000001,
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
		name  : 'weight',
		label : <TooltipLabel
			labelText="Total Weight"
			tooltipText="For rate calculation, weight will be converted to KG"
		/>,
		showTopLabelOnly : true,
		span             : 6,
		controls         : [
			{
				name  : 'total_weight',
				type  : 'input',
				span  : 4,
				value : 1,
				rules : {
					required : 'Weight is required',
					validate : (val) => validate(val),
					min      : 1,
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
		name         : 'packing_list',
		type         : 'upload',
		label        : 'Packing List',
		showOptional : true,
		accept       : 'image/*,.pdf,.csv,.xlsx,.doc,.docx',
		uploaderType : 'card',
	},
];
