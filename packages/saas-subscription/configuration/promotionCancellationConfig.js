const getPromotionCancellationConfig = ({ t }) => [
	{
		key        : 'service_name',
		label      : t('saasSubscription:promo_cancel_name'),
		renderFunc : 'renderName',
		width      : '30%',
	},
	{
		key        : 'value',
		label      : t('saasSubscription:promo_cancel_val'),
		renderFunc : 'renderValue',
		width      : '20%',
	},
	{
		key   : 'usages_left',
		label : t('saasSubscription:promo_cancel_use'),
		width : '20%',
	},
	{
		key        : 'is_active',
		label      : t('saasSubscription:promo_cancel_status'),
		renderFunc : 'renderStatus',
		width      : '30%',
	},
];

export default getPromotionCancellationConfig;
