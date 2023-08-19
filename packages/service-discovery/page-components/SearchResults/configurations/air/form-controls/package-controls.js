import validate from '../../../utils/validateNumber';

import TooltipLabel from './TooltipLabel';

const DIMENSIONS_OPTIONS = [
	{ label: 'CM', value: 'cm' },
	{ label: 'IN', value: 'inch' },
];

const WEIGHT_OPTIONS = [
	{ label: 'KG/UNIT', value: 'kg_unit' },
	{ label: 'LB/UNIT', value: 'lb_unit' },
];

const STACKABILITY_OPTIONS = [
	{ label: 'Stackable', value: 'stackable' },
	{ label: 'Non-stackable', value: 'non_stackable' },
];

export const PACKAGE_CONTROLS = [
	{
		name               : 'packages',
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
				value          : 1,
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
				value       : 1,
				rules       : {
					required : true,
					validate : (val) => validate(val),
					max      : 10000,
					min      : 0.1,
				},
			},
			{
				name        : 'width',
				label       : 'Width',
				type        : 'input',
				placeholder : 'Enter width',
				span        : 3,
				value       : 1,
				rules       : {
					required : true,
					validate : (val) => validate(val),
					max      : 10000,
					min      : 0.1,
				},
			},
			{
				name        : 'height',
				label       : 'Height',
				type        : 'input',
				placeholder : 'Enter height',
				span        : 3,
				value       : 1,
				rules       : {
					required : true,
					validate : (val) => validate(val),
					max      : 10000,
					min      : 0.1,
				},
			},
			{
				name  : 'dimensions_unit',
				label : <TooltipLabel
					labelText="Unit"
					tooltipText="For rate calculation, volume will be converted to CBM"
				/>,
				type    : 'select',
				span    : 3,
				value   : 'cm',
				options : DIMENSIONS_OPTIONS,
				rules   : { required: true },
			},
			{
				name        : 'weight',
				label       : 'Weight Per Unit',
				type        : 'input',
				placeholder : 'Enter weight',
				span        : 4,
				value       : 1,
				rules       : {
					required : 'Weight is required',
					validate : (val) => validate(val),
					max      : 10000,
					min      : 1,
				},
			},
			{
				name  : 'weight_unit',
				label : <TooltipLabel
					labelText="Unit"
					tooltipText="For rate calculation, weight will be converted to KG"
				/>,
				type    : 'select',
				span    : 8,
				value   : 'kg_unit',
				options : WEIGHT_OPTIONS,
				rules   : { required: true },
			},
			{
				name    : 'stackability',
				type    : 'chips',
				span    : 10,
				value   : 'stackable',
				options : STACKABILITY_OPTIONS,
			},
		],
	},
];
