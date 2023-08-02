export const overheadsConfig = [
	{
		Header   : 'Name',
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : 'Unit',
		accessor : 'unit',
		id       : 'unit',
		Cell     : () => 1,
	},
	{
		Header   : 'Currency',
		accessor : 'currency',
		id       : 'currency',
	},
	{
		Header   : 'Ex. Rate',
		accessor : 'exchangeRate',
		id       : 'exchangeRate',
	},
	{
		Header   : 'Price',
		accessor : 'price',
		id       : 'price',
	},
	{
		Header   : 'Quantity',
		accessor : 'quantity',
		id       : 'quantity',
	},
	{
		Header   : 'Sub Total',
		accessor : 'subTotal',
		id       : 'subTotal',
	},
	{
		Header   : 'Grand Total',
		accessor : 'total',
		id       : 'grandTotal',
	},
];
