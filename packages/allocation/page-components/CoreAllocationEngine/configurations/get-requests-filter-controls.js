const getControls = ({ t = () => {} }) => ([
	{
		name     : 'stakeholder_type',
		type     : 'chips',
		label    : t('allocation:stakeholder_type_label'),
		multiple : true,
		options  : [
			{ value: 'sales_agent', label: t('allocation:sales_agent_label') },
			{ value: 'booking_agent', label: t('allocation:booking_agent_label') },
			{ value: 'ckam', label: t('allocation:ckam_label') },
			{ value: 'supply_agent', label: t('allocation:supply_agent_label') },
			{ value: 'entity_manager', label: t('allocation:entity_manager_label') },
			{ value: 'portfolio_manager', label: t('allocation:portfolio_manager_label') },
		],
	},
	{
		name    : 'status',
		type    : 'chips',
		label   : t('allocation:status_label'),
		options : [
			{ value: 'pending', label: t('allocation:status_pending_label') },
			{ value: 'approved', label: t('allocation:status_approved_label') },
			{ value: 'rejected', label: t('allocation:status_rejected_label') },
		],
	},
	{
		name                  : 'created_at',
		type                  : 'dateRangePicker',
		label                 : t('allocation:requested_at_label'),
		isPreviousDaysAllowed : true,
	},
]);

export default getControls;
