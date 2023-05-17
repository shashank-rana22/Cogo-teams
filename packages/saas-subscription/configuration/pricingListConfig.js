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
		key   : 'price',
		title : 'Price',
		width : '22%',
	},
	{
		key   : 'discount',
		title : 'Plan Discount',
		width : '22%',
	},
	{
		key        : 'edit',
		title      : '',
		width      : '5%',
		renderFunc : 'renderEdit',
	},
];

export default pricingListConfig;
