const getUsagesConfig = () => [
	{
		key   : 'product_name',
		label : 'Product Name',
	},
	{
		key   : 'event_name',
		label : 'Event Name',
	},
	{
		key        : 'quantity',
		label      : 'Quantity',
		renderFunc : 'renderQuotaQty',
	},
	{
		key        : 'created_at',
		label      : 'Created At',
		renderFunc : 'renderDate',
	},
];

export default getUsagesConfig;
