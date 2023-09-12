const getCreateRelationsControls = ({ t = () => {} }) => {
	const controls = [
		{
			name    : 'relation_type',
			label   : t('allocation:relation_type_label'),
			type    : 'radioGroup',
			value   : 'keep',
			options : [
				{ value: 'keep', label: t('allocation:keep_label') },
				{ value: 'remove', label: t('allocation:remove_label') },
			],
		},
		{
			name        : 'service_id',
			label       : t('allocation:business_name'),
			placeholder : t('allocation:select_organization_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'organizations',
			initialCall : false,
			isClearable : true,
			rules       : {
				required: t('allocation:organization_required'),
			},
		},
		{
			name        : 'service_user_id',
			label       : t('allocation:user_label'),
			placeholder : t('allocation:select_user'),
			type        : 'asyncSelect',
			asyncKey    : 'organization_users',
			valueKey    : 'user_id',
			initialCall : false,
			disabled    : true,
			isClearable : true,
			rules       : {
				required: t('allocation:user_rules_required'),
			},
		},
		{
			name        : 'stakeholder_type',
			label       : t('allocation:stakeholder_type_label'),
			placeholder : t('allocation:stakeholder_type_placeholder'),
			type        : 'select',
			options     : [
				{ value: 'sales_agent', label: t('allocation:sales_agent_label') },
				{ value: 'credit_controller', label: t('allocation:credit_controller_label') },
				{ value: 'ckam', label: t('allocation:ckam_label') },
			],
			rules: {
				required: t('allocation:stakeholder_type_required'),
			},
			isClearable: true,
		},
		{
			name        : 'stakeholder_id',
			label       : t('allocation:stakeholder_id_label'),
			placeholder : t('allocation:stakeholder_id_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'partner_users',
			valueKey    : 'user_id',
			params      : {
				filters: {
					partner_entity_types: ['cogoport'],
				},
			},
			initialCall : false,
			rules       : {
				required: t('allocation:stakeholder_id_required'),
			},
		},
		{
			name        : 'reason',
			label       : t('allocation:relation_reason_label'),
			placeholder : t('allocation:relation_reason_placeholder'),
			type        : 'text',
			isClearable : true,
			rules       : {
				required: t('allocation:relation_reason_required'),
			},
		},
		{
			name           : 'expiry_date',
			label          : t('allocation:expiry_date_label'),
			placeholder    : t('allocation:expiry_date_placeholder'),
			type           : 'datePicker',
			showTimeSelect : true,
			dateFormat     : 'MMM d, yyyy, hh:mm a',
			minDate        : new Date(),
			rules          : { required: t('allocation:expiry_date_required') },
		},
	];

	return controls;
};

export default getCreateRelationsControls;
