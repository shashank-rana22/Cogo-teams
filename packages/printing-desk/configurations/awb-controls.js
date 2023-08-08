const NEGATIVE_CHECK_VALUE = 0;

const awbControls = [
	{
		name        : 'weight',
		placeholder : 'Enter Gross Weight',
		label       : 'Gross Weight',
		type        : 'number',
		span        : 6,
		rules       : {
			required : 'Gross Weight is Required',
			validate : (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
		},
	},
	{
		name        : 'volumetricWeight',
		placeholder : 'Enter Volumetric Weight',
		type        : 'number',
		label       : 'Volumetric Weight',
		span        : 6,
		rules       : {
			required: 'Volumetric Weight is Required',
		},
	},
	{
		name        : 'chargeableWeight',
		placeholder : 'Enter Chargeable Weight',
		label       : 'Chargeable Weight',
		type        : 'number',
		span        : 6,
		rules       : {
			required : 'Chargable Weight is Required',
			validate : (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
		},
	},
	{
		name        : 'totalPackagesCount',
		placeholder : 'Package Count',
		label       : 'Package Count',
		type        : 'number',
		span        : 6,
		disabled    : true,
		rules       : {
			required : 'Package Count is Required',
			validate : (value) => (value <= NEGATIVE_CHECK_VALUE ? 'Should be greater than 0' : true),
		},
	},
	{
		name               : 'dimension',
		label              : 'Dimensions (in cm)',
		type               : 'fieldArray',
		span               : 12,
		showButtons        : true,
		noDeleteButtonTill : 1,
		buttonText         : 'Add Dimension',
		value              : [
			{
				length  : '',
				width   : '',
				height  : '',
				package : '',
				unit    : '',
			},
		],
		controls: [
			{
				name        : 'length',
				placeholder : 'Enter Length',
				label       : 'Length',
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
				},
			},
			{
				name        : 'width',
				placeholder : 'Enter Width',
				label       : 'Width',
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
				},
			},
			{
				name        : 'height',
				placeholder : 'Enter Height',
				label       : 'Height',
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
				},
			},
			{
				name        : 'packages_count',
				placeholder : 'Enter Packages count',
				label       : 'No. of Packages',
				type        : 'number',
				span        : 3,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE ? 'Cannot be Negative' : true),
				},
			}, {
				name        : 'unit',
				label       : 'Unit',
				type        : 'select',
				placeholder : 'Select Unit',
				span        : 3,
				options     : [
					{ label: 'Cm', value: 'cms' },
					{ label: 'Inch', value: 'inch' },
				],
			},

		],
	},
];
export default awbControls;
