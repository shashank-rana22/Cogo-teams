import validate from '../../../utils/validateNumber';

const DIMENSIONS_OPTIONS = [
	{ label: 'CM', value: 'cm' },
	{ label: 'IN', value: 'inch' },
];

const WEIGHT_OPTIONS = [
	{ label: 'KG/UNIT', value: 'kg' },
	{ label: 'LB/UNIT', value: 'lb' },
];

const STACKABILITY_OPTIONS = [
	{ label: 'Stackable', value: 'stackable' },
	{ label: 'Non-stackable', value: 'non_stackable' },
];

export const PACKAGE_CONTROLS = [
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
				options : DIMENSIONS_OPTIONS,
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
				value   : 'kg',
				options : WEIGHT_OPTIONS,
			},
			{
				name    : 'stackability',
				type    : 'chips',
				span    : 10,
				value   : 'stackable',
				options : STACKABILITY_OPTIONS,
				rules   : { required: 'Container size is required' },
			},
		],
	},
];
