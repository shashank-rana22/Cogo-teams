import DISCOUNT_LIMIT_UNIT_MAPPING from '../../../../configs/DISCOUNT_LIMIT_UNIT_MAPPING.json';

const MIN_DISCOUNT_PRICE = 0;

const shipmentConfigControls = () => [
	{
		name        : 'slab_unit',
		label       : 'Slab Unit',
		type        : 'select',
		placeholder : 'Shipment Value',
		span        : 1.7,
		disabled    : true,
		size        : 'sm',
	},
	{
		name           : 'slab_unit_currency',
		label          : 'Slab Currency',
		type           : 'select',
		placeholder    : 'Currency',
		optionsListKey : 'currencies',
		rules          : {
			required: 'Slab Currency is required',
		},
		span : 1.2,
		size : 'sm',
	},
	{
		name        : 'slab_lower_limit',
		label       : 'Slab From',
		type        : 'number',
		placeholder : 'Value',
		span        : 1.2,
		rules       : {
			min: 0,
		},
		disabled : true,
		size     : 'sm',
	},
	{
		name        : 'slab_upper_limit',
		label       : 'Slab To',
		type        : 'number',
		placeholder : 'Value',
		span        : 1.2,
		rules       : {
			min      : 0,
			required : 'Slab To is Required.',
		},
		size: 'sm',
	},
	{
		name        : 'discount_limit_unit',
		label       : 'Discount Limit Unit',
		type        : 'select',
		placeholder : 'Value',
		options     : DISCOUNT_LIMIT_UNIT_MAPPING,
		value       : 'percentage',
		rules       : { required: 'Discount Limit Unit is required' },
		span        : 1.4,
		size        : 'sm',
	},
	{
		name        : 'discount_limit_value',
		label       : 'Discount Limit Value',
		type        : 'number',
		placeholder : 'Value',
		rules       : {
			required : 'Discount Limit Value is required',
			min      : 0,
			validate : (value) => (value >= MIN_DISCOUNT_PRICE ? true : 'Invalid Price Value'),
		},
		span : 1.5,
		size : 'sm',
	},
	{
		name        : 'max_allowed_discount_value',
		label       : 'Max Allowed Discount Value',
		type        : 'number',
		placeholder : 'Value',
		rules       : {
			required : 'Max Allowed Discount Value is required',
			min      : 0,
			validate : (value) => (value >= MIN_DISCOUNT_PRICE ? true : 'Invalid Price Value'),
		},
		span : 2,
		size : 'sm',
	},
];

export default shipmentConfigControls;
