const getAddonConfig = ({ t }) => [
	{
		key        : 'product_name',
		title      : t('saasSubscription:pricing_addon_config_name'),
		renderFunc : 'renderName',
		width      : '40%',
	},
	{
		key        : 'unit_count',
		title      : t('saasSubscription:pricing_addon_config_count'),
		renderFunc : 'renderNumber',
		width      : '30%',
	},
	{
		key        : 'discount_percent',
		title      : t('saasSubscription:pricing_addon_config_discount'),
		renderFunc : 'renderNumber',
		width      : '30%',

	},
];

export default getAddonConfig;
