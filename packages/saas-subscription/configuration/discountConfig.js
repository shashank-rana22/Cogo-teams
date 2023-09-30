const getDiscountConfig = ({ t }) => [
	{
		key        : 'service_name',
		label      : t('saasSubscription:discount_config_name'),
		renderFunc : 'renderName',
		width      : '20%',
	},
	{
		key        : 'config_type',
		label      : t('saasSubscription:discount_config_type'),
		renderFunc : 'renderName',
		width      : '18%',

	},
	{
		key        : 'unit',
		label      : t('saasSubscription:discount_config_unit'),
		renderFunc : 'renderName',
	},
	{
		key   : 'value',
		label : t('saasSubscription:discount_config_val'),
	},
	{
		key   : 'usage_count',
		label : t('saasSubscription:discount_config_count'),
	},
	{
		key        : 'is_active',
		label      : t('saasSubscription:discount_config_status'),
		renderFunc : 'renderStatus',
	},
	{
		key        : 'editor',
		label      : '',
		renderFunc : 'renderEdit',
		width      : '5%',
	},
];

export default getDiscountConfig;
