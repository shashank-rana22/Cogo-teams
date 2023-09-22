const OPTIONS = [
	{ label: 'Shipment', value: 'shipment' },
	{ label: 'Partner Premium', value: 'partner-premium' },
	{ label: 'Partner Standard', value: 'partner-standard' },
	{ label: 'Partner Starter', value: 'partner-starter' },
	{ label: 'Premium', value: 'premium' },
	{ label: 'Standard', value: 'standard' },
	{ label: 'Starter', value: 'starter' },
];
const control = [
	{
		name        : 'tags',
		type        : 'multi_select',
		clearable   : true,
		placeholder : 'Select Tags',
		options     : OPTIONS,
		span        : 12,
	},
	{
		name        : 'shipping_line_id',
		type        : 'async_select',
		clearable   : true,
		placeholder : 'Shipping Line',
		asyncKey    : 'list_operators',
		multiple    : true,
		span        : 12,
		params      : {
			filters: {
				status        : 'active',
				operator_type : ['shipping_line'],
			},
			page_limit: 1000,
		},
	},

];

export default control;
