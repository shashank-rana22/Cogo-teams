const getControls = [
	{
		name               : 'packages',
		type               : 'fieldArray',
		className          : 'primary md',
		buttonText         : 'Add More Packages',
		noDeleteButtonTill : 1,
		value              : [
			{
				package_type   : '',
				packages_count : '',
				package_weight : '',
				handling_type  : '',
			},
		],
		controls: [
			{
				name        : 'packing_type',
				span        : 2,
				type        : 'select',
				label       : 'Package Type',
				className   : 'primary md',
				placeholder : 'Select',
				rules       : { required: 'Package Type is required' },
				options     : [
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
			},

			{
				name        : 'packages_count',
				label       : 'Quantity',
				placeholder : 'Quantity',
				type        : 'number',
				className   : 'primary md',
				span        : 2,
				rules       : { required: true },
			},

			{
				name        : 'package_weight',
				label       : 'Weight per package',
				placeholder : 'Kgs',
				className   : 'primary md',
				type        : 'number',
				span        : 3,
				rules       : { required: true },
			},

			{
				name          : 'dimensions',
				label         : 'Dimensions (in cm)',
				type          : 'input-group',
				subLabel      : 'CM',
				className     : 'primary md',
				span          : 4,
				style         : { marginLeft: '1px', marginRight: '1px' },
				inputControls : [
					{
						name        : 'length',
						type        : 'number',
						placeholder : 'L',
						className   : 'primary md',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'height',
						type        : 'number',
						placeholder : 'H',
						className   : 'primary md',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'width',
						type        : 'number',
						placeholder : 'W',
					},
				],
				rules: {
					required : true,
					validate : (value) => (value?.length && value?.width && value?.height
						? undefined
						: 'Dimension is Required'),
				},
			},
		],
	},
];

export default getControls;
