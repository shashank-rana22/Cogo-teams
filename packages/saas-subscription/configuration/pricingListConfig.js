const getPricingListConfig = ({ t }) => [
	{
		key   : 'currency',
		title : t('saasSubscription:pricing_config_curr'),
		width : '22%',
	},
	{
		key        : 'period_unit',
		title      : t('saasSubscription:pricing_config_frequency'),
		width      : '22%',
		renderFunc : 'renderPeriod',
	},
	{
		key        : 'price',
		title      : t('saasSubscription:pricing_config_price'),
		width      : '22%',
		renderFunc : 'renderPrice',
	},
	{
		key        : 'discount',
		title      : t('saasSubscription:pricing_config_discount'),
		width      : '22%',
		renderFunc : 'renderDiscount',
	},

];

export default getPricingListConfig;
