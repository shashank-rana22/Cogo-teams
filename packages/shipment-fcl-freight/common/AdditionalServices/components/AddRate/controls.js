import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

const controls = (options, item, containerList) => [
	{
		name        : 'currency',
		label       : 'Currency',
		type        : 'select',
		disabled    : true,
		className   : 'primary sm',
		placeholder : 'Select',
		options     : [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
		].map((currency) => ({
			label : currency,
			value : currency,
		})),
		span        : 6,
		stakeholder : [
			'okam_create',
			'okam_update',
			'so_update',
			'so_create',
			'customer',
		],
	},
	{
		name        : 'buy_price',
		label       : 'Buy price',
		type        : 'number',
		disabled    : true,
		span        : 6,
		className   : 'primary sm',
		placeholder : 'Enter Buy Price',
		stakeholder : ['okam_create', 'okam_update', 'so_update', 'so_create'],
	},
	{
		name        : 'unit',
		label       : 'Unit',
		type        : 'select',
		span        : 6,
		disabled    : true,
		className   : 'primary sm',
		caret       : true,
		placeholder : 'Unit',
		options,
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		name        : 'quantity',
		label       : 'Quantity',
		type        : 'number',
		className   : 'primary sm',
		span        : 6,
		placeholder : 'Enter Quantity',
		stakeholder : ['okam_create', 'okam_update', 'so_create', 'customer'],
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		name        : 'price',
		label       : 'Price',
		type        : 'text',
		className   : 'primary sm',
		span        : 6,
		placeholder : 'Enter Price',
		stakeholder : ['customer'],
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		name        : 'price',
		label       : 'Sell Price',
		type        : 'text',
		className   : 'primary sm',
		span        : 6,
		placeholder : 'Enter Sell Price',
		stakeholder : ['okam_create', 'okam_update'],
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		name           : 'service_provider_id',
		label          : 'Service provider',
		type           : 'select',
		optionsListKey : 'organizations',
		params         : {
			filters: {
				account_type : 'service_provider',
				kyc_status   : 'verified',
			},
		},
		caret       : true,
		span        : 6,
		rules       : { required: 'org is required' },
		stakeholder : ['so_update', 'so_create'],
	},
	{
		name        : 'alias',
		label       : 'Alias (Optional)',
		type        : 'text',
		className   : 'primary sm',
		span        : 6,
		placeholder : 'Enter Alias (Only if required) ',
		rules       : {
			minLength: 3,
		},
	},

	...(item?.service_type === 'rail_domestic_freight_service'
		? [
			{
				name        : 'container_number',
				label       : 'Container Number',
				type        : 'select',
				className   : 'primary sm',
				disabled    : true,
				span        : 6,
				placeholder : 'Container Number',
				rules       : { required: { value: true, message: 'This is required' } },
				options     : containerList,
			},
		]
		: []),
];

export default controls;
