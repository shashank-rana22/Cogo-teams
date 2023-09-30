import validate from '../../../utils/validateNumber';

const TONS_TO_KGS_CONVERSION_FACTOR = 1000;

const getGrossControls = ({ formValues = {}, setValue = () => {} }) => {
	const { unit, package_weight } = formValues;

	const CARGO_GROSS_CONTROLS = [
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
			rules : { required: true },
		},
		{
			name  : 'packages_count',
			label : 'Total Quantity',
			type  : 'input',
			value : 1,
			rules : { required: true, validate: (val) => validate(val) },
		},
		{
			name  : 'package_weight',
			label : 'Total Weight',
			span  : 8,
			type  : 'input',
			value : 1,
			rules : { required: true, validate: (val) => validate(val) },
		},
		{
			name     : 'unit',
			label    : 'Unit',
			type     : 'select',
			value    : 'kg',
			span     : 4,
			onChange : (val) => {
				if (unit === val) {
					return;
				}
				if (val === 'kg') {
					setValue('package_weight', package_weight * TONS_TO_KGS_CONVERSION_FACTOR);
				} else {
					setValue('package_weight', package_weight / TONS_TO_KGS_CONVERSION_FACTOR);
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
			name   : 'volume',
			label  : 'Gross Volume',
			type   : 'input',
			value  : 1,
			suffix : <span style={{ fontSize: 14, fontWeight: 600, marginRight: 16, opacity: 0.6 }}>CC</span>,
			rules  : { required: true, validate: (val) => validate(val) },
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
		{
			name  : 'dimensions',
			label : 'Max Dimensions (in cm)',
			type  : 'input-group',
			value : {
				length : 1,
				width  : 1,
				height : 1,
			},
			inputControls: [
				{
					name        : 'length',
					type        : 'input',
					placeholder : 'L',
				},
				{
					name        : 'width',
					type        : 'input',
					placeholder : 'W',
				},
				{
					name        : 'height',
					type        : 'input',
					placeholder : 'H',
				},
			],
			rules: {
				required : 'Dimensions are Required',
				validate : (value) => (value?.length && value?.width && value?.height
					? undefined
					: 'Dimension is Required'),
			},
		},
	];
	return CARGO_GROSS_CONTROLS;
};
export default getGrossControls;
