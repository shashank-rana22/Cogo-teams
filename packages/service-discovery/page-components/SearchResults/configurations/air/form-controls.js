import validate from '../../utils/validateNumber';

const airControls = () => {
	const controls = [
		{
			name               : 'package',
			type               : 'field-array',
			buttonText         : 'Add another Package Type',
			noDeleteButtonTill : 1,
			controls           : [
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
					name        : 'length',
					label       : 'Length',
					type        : 'input',
					placeholder : 'Enter length',
					span        : 3,
					rules       : {
						required : 'Length is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name        : 'width',
					label       : 'Width',
					type        : 'input',
					placeholder : 'Enter width',
					span        : 3,
					rules       : {
						required : 'Width is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name        : 'height',
					label       : 'Height',
					type        : 'input',
					placeholder : 'Enter height',
					span        : 3,
					rules       : {
						required : 'Height is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name    : 'unit',
					type    : 'select',
					span    : 3,
					options : [
						{
							label : 'CM',
							value : 'cm',
						},
						{
							label : 'IN',
							value : 'inch',
						},
					],
					rules: {
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name        : 'weight',
					label       : 'Weight Per Unit',
					type        : 'input',
					placeholder : 'Enter weight',
					span        : 4,
					rules       : {
						required : 'Weight is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name    : 'weight_unit',
					type    : 'select',
					span    : 8,
					options : [
						{
							label : 'KG/UNIT',
							value : 'kg',
						},
						{
							label : 'LB/UNIT',
							value : 'lb',
						},
					],
					rules: {
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					label   : 'Commodity',
					name    : 'commodity',
					type    : 'select',
					options : [
						{
							label : 'General',
							value : 'general',
						},
						{
							label : 'Dangerous',
							value : 'dangerous',
						},
						{
							label : 'Temp Controlled',
							value : 'temp_controlled',
						},
						{
							label : 'Other Special',
							value : 'other_special',
						},
					],
					span  : 12,
					value : 'general',
					rules : { required: 'Commodity is required' },
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
					rules: { required: 'Container size is required' },
				},
			],
		},
	];

	return controls;
};
export default airControls;
