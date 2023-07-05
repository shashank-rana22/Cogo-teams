const addonConfig = [
	{
		key        : 'product_name',
		title      : 'Display Name',
		renderFunc : 'renderName',
		width      : '40%',
	},
	{
		key        : 'unit_count',
		title      : 'Count',
		renderFunc : 'renderNumber',
		width      : '30%',
	},
	{
		key        : 'discount_percent',
		title      : 'Discount (in%)',
		renderFunc : 'renderNumber',
		width      : '30%',

	},
];

export default addonConfig;
