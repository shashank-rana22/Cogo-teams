const getPricingListConfig = ({ t }) => [
	{
		key   : 'currency',
		title : t('saasSubscription:pricing_config_curr'),
		width : '22%',
	},
	{
		key   : 'period',
		title : t('saasSubscription:pricing_config_curr'),
		width : '22%',
	},
	{
		key        : 'price',
		title      : t('saasSubscription:pricing_config_curr'),
		width      : '22%',
		renderFunc : 'renderPrice',
	},
	{
		key        : 'discount',
		title      : t('saasSubscription:pricing_config_curr'),
		width      : '22%',
		renderFunc : 'renderDiscount',
	},

];

export default getPricingListConfig;
