export const chartBuckets = [
	{
		heading : 'revenue',
		keys    : ['invoiced', 'accrued', 'cancelled'],
	},
	{
		heading : 'profit',
		keys    : ['bill_price', 'sale_price', 'profit'],
	},
	{
		heading : 'cost',
		keys    : ['bill_price'],
	},
];

export const pieBuckets = [
	{
		heading : 'By Product',
		key     : 'product',
	},
	{
		heading : 'By Channel',
		key     : 'channel',
	},
	{
		heading : 'By Account Type',
		key     : 'account',
	},
];

export const selectOptions = [
	{
		label : 'By ETD',
		value : 'true',
	},
	{
		label : 'By Shipment Date',
		value : 'false',
	},
];
