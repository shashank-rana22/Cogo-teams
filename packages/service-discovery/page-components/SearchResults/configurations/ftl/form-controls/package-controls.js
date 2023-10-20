import validate from '../../../utils/validateNumber';

const TONS_TO_KGS_CONVERSION_FACTOR = 1000;

const getPerPackageControls = ({ formValues = {}, setValue = () => {} }) => {
	const { packages = [] } = formValues;

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
					value : 'pallet',
					rules : { required: 'Package Type is required' },
				},
				{
					name  : 'packages_count',
					label : 'Quantity',
					type  : 'input',
					value : 1,
					rules : { required: true, validate: (val) => validate(val) },
				},
				{
					name  : 'package_weight',
					label : 'Weight per package',
					type  : 'input',
					span  : 8,
					value : 1,
					rules : { required: true, validate: (val) => validate(val) },
				},
				{
					name     : 'unit',
					label    : 'Unit',
					type     : 'select',
					value    : 'kg',
					span     : 4,
					onChange : (val, _, index) => {
						const { unit, package_weight } = packages[index] || {};

						if (unit === val) {
							return;
						}
						if (val === 'kg') {
							setValue(
								`packages[${index}].package_weight`,
								package_weight * TONS_TO_KGS_CONVERSION_FACTOR,
							);
						} else {
							setValue(
								`packages[${index}].package_weight`,
								package_weight / TONS_TO_KGS_CONVERSION_FACTOR,
							);
						}
					},
					options: [
						{
							label : 'Kgs',
							value : 'kg',
						},
						{
							label : 'Tons',
							value : 'ton',
						},
					],
					rules: { required: true },
				},
				{
					name  : 'dimensions',
					label : 'Dimensions (in cm)',
					type  : 'input-group',
					value : {
						length : 1,
						width  : 1,
						height : 1,
					},
					inputControls: [
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
					value   : 'stackable',
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
	return CARGO_PACKAGE_CONTROLS;
};
export default getPerPackageControls;
