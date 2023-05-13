export const serviceConfig = (service) => [
	{
		label : service || '',
		span  : 4.5,
		key   : 'service',
	},
	{
		label : 'Currency',
		span  : 1,
		key   : 'currency',
	},
	{
		label : 'Rate',
		span  : 2.5,
		key   : 'rate',
	},
	{
		label : 'Exc. Rate',
		span  : 1,
		key   : 'exchange_rate',
	},
	{
		label : 'Quantity',
		span  : 1,
		key   : 'quantity',
	},
	{
		label : 'Tax Amt.',
		span  : 2.5,
		key   : 'tax_amount',
	},
	{
		label : 'Cost',
		span  : 2,
		key   : 'cost',
	},
];
