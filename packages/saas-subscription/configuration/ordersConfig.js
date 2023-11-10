const getOrderConfig = ({ t }) => [
	{
		key   : 'serial_id',
		label : t('saasSubscription:orders_serial_id'),
	},
	{
		key        : 'plan_name',
		label      : t('saasSubscription:orders_plan_name'),
		renderFunc : 'renderOrderPlanName',
	},
	{
		key        : 'performed_by',
		label      : t('saasSubscription:orders_performed_by'),
		renderFunc : 'renderPerformedBy',
	},
	{
		key        : 'total_amt',
		label      : t('saasSubscription:orders_total_amt'),
		renderFunc : 'renderTotalAmt',
	},
	{
		key        : 'created_at',
		label      : t('saasSubscription:orders_created_at'),
		renderFunc : 'renderDate',
	},
];

export default getOrderConfig;
