import validate from '../../../utils/validateNumber';

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
		rules: { required: true },
	},
	{
		name  : 'packages_count',
		label : 'Total Quantity',
		type  : 'input',
		rules : { required: true, validate: (val) => validate(val) },
	},
	{
		name  : 'package_weight',
		label : 'Total Weight',
		span  : 8,
		type  : 'input',
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
		name   : 'volume',
		label  : 'Gross Volume',
		type   : 'input',
		suffix : <span style={{ fontSize: 14, fontWeight: 600, marginRight: 16, opacity: 0.6 }}>CC</span>,
		rules  : { required: true, validate: (val) => validate(val) },
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
	{
		name          : 'dimensions',
		label         : 'Max Dimensions (in cm)',
		type          : 'input-group',
		inputControls : [
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
export default CARGO_GROSS_CONTROLS;
