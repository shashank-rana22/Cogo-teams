const getUsagesConfig = ({ t }) => [
	{
		key   : 'product_name',
		label : t('saasSubscription:usages_product_name'),
	},
	{
		key   : 'event_name',
		label : t('saasSubscription:usages_event_name'),
	},
	{
		key        : 'quantity',
		label      : t('saasSubscription:usages_quantity'),
		renderFunc : 'renderQuotaQty',
	},
	{
		key        : 'created_at',
		label      : t('saasSubscription:usages_created_at'),
		renderFunc : 'renderDate',
	},
];

export default getUsagesConfig;
