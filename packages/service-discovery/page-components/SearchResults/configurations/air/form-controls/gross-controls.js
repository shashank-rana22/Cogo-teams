import validate from '../../../utils/validateNumber';

import TooltipLabel from './TooltipLabel';

export const getGrossControls = () => {
	const GROSS_CONTROLS = [
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
			name           : 'packing_type',
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
			span             : 5.5,
			controls         : [
				{
					name  : 'total_volume',
					type  : 'input',
					span  : 5,
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
					span        : 7,
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
					rules: { required: 'This is required' },
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
			span             : 5.5,
			controls         : [
				{
					name  : 'total_weight',
					type  : 'input',
					span  : 5,
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
					span        : 7,
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
					rules: { required: 'This is required' },
				},
			],
		},
		{
			name    : 'handling_type',
			label   : 'Handling',
			type    : 'chips',
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
			uploaderType : 'input',
		},
	];

	return GROSS_CONTROLS;
};
