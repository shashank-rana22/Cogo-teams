import validate from '../../../utils/validateNumber';

import TooltipLabel from './TooltipLabel';

const TONS_TO_KGS_CONVERSION_FACTOR = 1000;

const getPerPackageControls = ({ formValues = {}, setValue = () => {} }) => {
	const { packages = [] } = formValues;

	const CARGO_PACKAGE_CONTROLS = [
		{
			name               : 'packages',
			type               : 'fieldArray',
			buttonText         : 'Add More Packages',
			noDeleteButtonTill : 1,
			childLabel         : 'Package',
			controls           : [
				{
					name    : 'packing_type',
					type    : 'chips',
					label   : 'Package Type',
					size    : 'sm',
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
					span  : 3,
					rules : { required: true, validate: (val) => validate(val) },
				},
				{
					name             : 'weight',
					label            : 'Weight per package',
					showTopLabelOnly : true,
					span             : 7,
					controls         : [
						{
							name  : 'package_weight',
							label : 'Weight per package',
							type  : 'input',
							span  : 7,
							value : 1,
							rules : { required: true, validate: (val) => validate(val) },
						},
						{
							name  : 'unit',
							label : <TooltipLabel
								labelText="Weight unit"
								tooltipText="For rate calculation, weight will be converted to Tons"
							/>,
							type     : 'select',
							value    : 'kg',
							span     : 5,
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
					],
					rules: { required: true },
				},
				{
					name  : 'dimensions',
					label : 'Dimensions (in cm)',
					type  : 'input-group',
					value : {
						length          : 1,
						width           : 1,
						height          : 1,
						dimensions_unit : 'cm',
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
					type    : 'chips',
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
