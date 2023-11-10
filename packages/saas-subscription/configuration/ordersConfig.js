const getOrderConfig = () => [
	{
		key   : 'serial_id',
		label : 'Serial Id',
	},
	{
		key        : 'plan_name',
		label      : 'Plan Name',
		renderFunc : 'renderOrderPlanName',
	},
	{
		key        : 'performed_by',
		label      : 'Performed By',
		renderFunc : 'renderPerformedBy',
	},
	{
		key        : 'total_amt',
		label      : 'Total',
		renderFunc : 'renderTotalAmt',
	},
	{
		key        : 'created_at',
		label      : 'created At',
		renderFunc : 'renderDate',
	},
];

export default getOrderConfig;
