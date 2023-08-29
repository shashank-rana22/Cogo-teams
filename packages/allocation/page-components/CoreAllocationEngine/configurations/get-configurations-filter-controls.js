const getControls = ({ t = () => {} }) => [
	{
		name        : 'role_ids',
		label       : t('allocation:role_ids_label'),
		type        : 'asyncSelect',
		multiple    : true,
		placeholder : t('allocation:role_ids_placeholder'),
		asyncKey    : 'partner_roles',
		initialCall : false,
		params      : {
			permissions_data_required : false,
			filters                   : {
				status               : true,
				partner_entity_types : ['cogoport'],
			},
		},
		isClearable: true,
	},
	{
		name        : 'stakeholder_type',
		label       : t('allocation:stakeholder_type_label'),
		type        : 'select',
		placeholder : t('allocation:stakeholder_type_placeholder'),
		options     : [
			{ value: 'sales_agent', label: t('allocation:sales_agent_label') },
			{ value: 'booking_agent', label: t('allocation:booking_agent_label') },
			{ value: 'supply_agent', label: t('allocation:supply_agent_label') },
			{ value: 'entity_manager', label: t('allocation:entity_manager_label') },
			{ value: 'ckam', label: t('allocation:ckam_label') },
			{ value: 'credit_controller', label: t('allocation:credit_controller_label') },
			{ value: 'service_ops2', label: ('allocation:service_ops_two') },
			{ value: 'trade_finance_agent', label: ('allocation:trade_finance_agent') },
		],
		isClearable: true,
	},

	{
		name    : 'locking_criterion',
		type    : 'chips',
		label   : t('allocation:locking_criterion_label'),
		options : [
			{ value: 'quotations_last_date', label: t('allocation:quotations_last_date') },
			{ value: 'shipment_booked', label: t('allocation:shipment_booked') },
		],
		multiple: true,
	},
	{
		name    : 'schedule_type',
		type    : 'chips',
		label   : t('allocation:schedule_type'),
		options : [
			{ value: 'daily', label: t('allocation:daily_label') },
			{ value: 'weekly', label: t('allocation:weekly_label') },
			{ value: 'monthly', label: t('allocation:monthly_label') },
		],
		multiple: true,
	},
	{
		name    : 'status',
		type    : 'chips',
		label   : t('allocation:status_header'),
		options : [
			{ value: 'active', label: t('allocation:active_status') },
			{ value: 'draft', label: t('allocation:draft_status') },
			{ value: 'publishable', label: t('allocation:publishable_status') },
			{ value: 'checking', label: t('allocation:checking_status') },
			{ value: 'not_publishable', label: t('allocation:not_publishable_status') },
		],
		multiple: true,
	},
];

export default getControls;
