export const quotationConfig = {
	showHeader   : true,
	headerStyles : {
		background: '#333',
	},
	fields: [
		{
			label : 'Name',
			key   : 'name',
			span  : 2.1,
			func  : 'renderName',
		},
		{
			label : 'Code',
			key   : 'code',
			func  : 'renderName',
			span  : 1,
		},
		{
			label       : 'Price',
			key         : 'price',
			currencyKey : 'currency',
			func        : 'renderAmount',
			span        : 1.5,
		},
		{
			label : 'Quantity',
			key   : 'quantity',
			func  : 'renderName',
			span  : 1.5,
		},
		{
			label : 'Unit',
			key   : 'unit',
			func  : 'renderName',
			span  : 2,
		},
		{
			label       : 'Pre tax total',
			key         : 'total_price_discounted',
			currencyKey : 'currency',
			func        : 'renderAmount',
			span        : 2,
		},
		{
			label : 'Tax%',
			key   : 'tax_percent',
			span  : 1.5,
			func  : 'renderName',
		},
		{
			label       : 'Post tax total',
			key         : 'tax_total_price_discounted',
			currencyKey : 'currency',
			func        : 'renderAmount',
			span        : 1.4,
		},
	],
};
