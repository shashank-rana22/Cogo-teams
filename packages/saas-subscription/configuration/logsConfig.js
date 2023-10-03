const getLogConfig = ({ t }) => [
	{
		key        : 'plan_name',
		label      : t('saasSubscription:log_control_name'),
		renderFunc : 'renderPlanName',
	},
	{
		key        : 'event',
		label      : t('saasSubscription:log_control_event'),
		renderFunc : 'renderEventName',
	},
	{
		key        : 'created_at',
		label      : t('saasSubscription:log_control_created_at'),
		renderFunc : 'renderDate',

	},
	{
		key        : 'updated_at',
		label      : t('saasSubscription:log_controls_updated_at'),
		renderFunc : 'renderDate',
	},
];

export default getLogConfig;
