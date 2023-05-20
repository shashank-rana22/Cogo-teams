const pricingListConfig = [
	{
		key   : 'currency',
		title : 'Currency',
		width : '22%',
	},
	{
		key   : 'period',
		title : 'Frequency',
		width : '22%',
	},
	{
		key        : 'price',
		title      : 'Price',
		width      : '22%',
		renderFunc : 'renderPrice',
	},
	{
		key        : 'discount',
		title      : 'Plan Discount',
		width      : '22%',
		renderFunc : 'renderDiscount',
	},

];

export default pricingListConfig;
