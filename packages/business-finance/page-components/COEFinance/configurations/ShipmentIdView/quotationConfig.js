export const quotationConfig = {
	showHeader   : true,
	headerStyles : {
		background: '#333',
	},
	bodyStyles: {
		fontSize: '12px',
	},
	fields: [
		{
			label : 'Name',
			key   : 'name',
			func  : 'renderQuotationName',
			span  : 2.1,
		},
		{
			label : 'Code',
			key   : 'code',
			span  : 1.5,
		},
		{
			label : 'Price',
			key   : 'price',
			func  : 'showFormattedPrice',
			span  : 1.5,
		},
		{
			label : 'Quantity',
			key   : 'quantity',
			span  : 1.5,
		},
		{
			label : 'Unit',
			key   : 'unit',
			span  : 2,
		},
		{
			label       : 'Pre tax total',
			key         : 'total_price',
			currencyKey : 'currency',
			func        : 'showFormattedPreTax',
			span        : 2,
		},
		{
			label : 'Tax%',
			key   : 'tax_percent',
			span  : 1.5,
		},
		{
			label       : 'Post tax total',
			key         : 'tax_total_price',
			currencyKey : 'currency',
			func        : 'showFormattedPostTax',
			span        : 1.4,
		},
	],
};
