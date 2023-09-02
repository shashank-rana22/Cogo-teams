const getCreateConfigurationsControls = ({
	setSegment = () => {},
	t = () => {},
}) => {
	const controls = [
		{
			name    : 'service_type',
			label   : t('allocation:service_type_label'),
			type    : 'radioGroup',
			options : [
				{ value: 'organization', label: t('allocation:organization') },
				{ value: 'lead_organization', label: t('allocation:lead_organization') },
			],
			rules: {
				required: t('allocation:service_type_rules_required'),
			},
		},
		{
			name        : 'role_ids',
			label       : t('allocation:role_ids_label'),
			placeholder : t('allocation:role_ids_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : false,
			params      : {
				permissions_data_required : false,
				filters                   : {
					status               : true,
					partner_entity_types : ['cogoport'],
				},
			},
			rules: {
				required: t('allocation:role_ids_rules_required'),
			},
			isClearable: true,
		},
		{
			name        : 'user_ids',
			label       : t('allocation:user_ids_label'),
			placeholder : t('allocation:user_ids_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_users',
			initialCall : false,
			disabled    : true,
			valueKey    : 'user_id',
			isClearable : true,
		},
		{
			name        : 'exclusion_user_ids',
			label       : t('allocation:exclusion_user_ids_label'),
			placeholder : t('allocation:user_ids_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_users',
			initialCall : false,
			disabled    : true,
			valueKey    : 'user_id',
			isClearable : true,
		},
		{
			name        : 'stakeholder_type',
			label       : t('allocation:stakeholder_type_label'),
			placeholder : t('allocation:stakeholder_type_placeholder'),
			type        : 'select',
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
			rules: {
				required: t('allocation:stakeholder_type_rules_required'),
			},
			isClearable: true,
		},
		{
			name              : 'segment_id',
			label             : t('allocation:segment_id_label'),
			placeholder       : t('allocation:segment_id_placeholder'),
			type              : 'asyncSelect',
			asyncKey          : 'segments',
			labelKey          : 'name',
			valueKey          : 'id',
			initialCall       : false,
			getSelectedOption : (obj) => {
				setSegment(obj?.name);
			},
			params: {
				segment_type         : 'global',
				status               : 'active',
				is_lead_user_segment : false,
			},
			rules: {
				required: t('allocation:segment_id_rules_required'),
			},
			isClearable: true,
		},
		{
			name        : 'locking_criterion',
			label       : t('allocation:locking_criterion_label'),
			placeholder : t('allocation:locking_criterion_placeholder'),
			type        : 'select',
			options     : [
				{ value: 'quotations_last_date', label: t('allocation:quotations_last_date') },
				{ value: 'shipment_booked', label: t('allocation:shipment_booked') },
			],
			rules: {
				required: t('allocation:locking_criterion_rules_required'),
			},
			isClearable: true,
		},
		{
			name        : 'locking_period',
			label       : t('allocation:locking_period_label'),
			placeholder : t('allocation:locking_period_placeholder'),
			type        : 'number',
			min         : 0,
			rules       : {
				required: t('allocation:locking_period_rules_required'),
			},
		},
		{
			name        : 'cooling_period',
			label       : t('allocation:cooling_period_label'),
			placeholder : t('allocation:cooling_period_placeholder'),
			type        : 'number',
			min         : 0,
			rules       : {
				required: t('allocation:cooling_period_rules_required'),
			},
		},
		{
			name        : 'schedule_data',
			label       : t('allocation:schedule_data_label'),
			placeholder : t('allocation:schedule_data_placeholder'),
			type        : 'selectDayFrequency',
			rules       : {
				required: t('allocation:schedule_data_rules_required'),
			},
		},
	];

	return controls;
};

export default getCreateConfigurationsControls;
