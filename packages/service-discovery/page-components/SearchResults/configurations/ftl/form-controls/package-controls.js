import validate from '../../../utils/validateNumber';

const CARGO_PACKAGE_CONTROLS = [
	{
		name               : 'packages',
		type               : 'fieldArray',
		buttonText         : 'Add More Packages',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name    : 'packing_type',
				type    : 'select',
				label   : 'Package Type',
				options : [
					{
						label : 'Pallet',
						value : 'pallet',
					},
					{
						label : 'Box',
						value : 'box',
					},
					{
						label : 'Crate',
						value : 'crate',
					},
					{
						label : 'Loose',
						value : 'loose',
					},
				],
				rules: { required: 'Package Type is required' },
			},
			{
				name  : 'packages_count',
				label : 'Quantity',
				type  : 'input',
				rules : { required: true, validate: (val) => validate(val) },
			},
			{
				name  : 'package_weight',
				label : 'Weight per package',
				type  : 'input',
				span  : 8,
				rules : { required: true, validate: (val) => validate(val) },
			},
			{
				name    : 'unit',
				label   : 'Unit',
				type    : 'select',
				span    : 4,
				options : [
					{
						label : 'Kgs',
						value : 'kgs',
					},
					{
						label : 'Tons',
						value : 'tons',
					},
				],
				rules: { required: true },
			},
			{
				name          : 'dimensions',
				label         : 'Dimensions (in cm)',
				type          : 'input-group',
				inputControls : [
					{
						name        : 'length',
						type        : 'number',
						placeholder : 'L',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'width',
						type        : 'number',
						placeholder : 'W',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'height',
						type        : 'number',
						placeholder : 'H',
					},
				],
				rules: {
					required : true,
					validate : (value) => (value?.length && value?.width && value?.height
						? undefined
						: 'Dimension is Required'),
				},
			},
			{
				name    : 'handling_type',
				label   : 'Handling',
				type    : 'select',
				options : [
					{
						label : 'Stackable',
						value : 'stackable',
					},
					{
						label : 'Non-Stackable',
						value : 'non_stackable',
					},
				],
				rules: { required: true },
			},
		],
	},
];
export default CARGO_PACKAGE_CONTROLS;
