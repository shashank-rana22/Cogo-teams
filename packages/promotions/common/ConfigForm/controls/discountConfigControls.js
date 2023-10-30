import FREQUENCY_MAPPING from '../../../configs/FREQUENCY_MAPPING.json';

const MIN_DISCOUNT_PRICE = 0;

const discountConfigControls = ({
	disabledFrequency = false,
}) => [
	{
		name        : 'discount_limit_unit',
		label       : 'Discount Limit Unit',
		type        : 'select',
		placeholder : 'Flat',
		span        : 1.7,
		disabled    : true,
		size        : 'sm',
	},
	{
		name        : 'discount_limit_currency',
		label       : 'Discount Limit Currency',
		type        : 'async_select',
		placeholder : 'Currency',
		asyncKey    : 'list_exchange_rate_currencies',
		initialCall : true,
		rules       : {
			required: 'Discount Limit Currency is required',
		},
		span : 2,
		size : 'sm',
	},
	{
		name        : 'discount_limit_value',
		label       : 'Discount Limit Value',
		type        : 'number',
		placeholder : 'Value',
		span        : 2,
		rules       : {
			required : 'Discount Limit Value is required',
			min      : 0,
			validate : (value) => (Number(value) >= MIN_DISCOUNT_PRICE ? true : 'Invalid Price Value'),
		},
		size: 'sm',
	},
	{
		name        : 'frequency',
		label       : 'Duration',
		type        : 'select',
		placeholder : 'Duration',
		options     : FREQUENCY_MAPPING,
		span        : 2,
		disabled    : disabledFrequency,
		rules       : {
			required: 'Duration is Required.',
		},
		size: 'sm',
	},
];

export default discountConfigControls;
