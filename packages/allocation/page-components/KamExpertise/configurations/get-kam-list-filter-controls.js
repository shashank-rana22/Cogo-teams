const getControls = (partnerId, t) => [
	{
		name        : 'manager_ids',
		label       : t('allocation:by_manager_name_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		valueKey    : 'user_id',
		initialCall : true,
		caret       : true,
		multiple    : true,
		isClearable : true,
		params      : {
			filters: {
				status               : 'active',
				partner_id           : partnerId,
				partner_entity_types : ['cogoport'],
			},
			page_limit: 10,
		},
	},
	{
		name        : 'role_ids',
		label       : t('allocation:by_role_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'asyncSelect',
		caret       : true,
		asyncKey    : 'partner_roles',
		initialCall : true,
		params      : {
			permissions_data_required : false,
			filters                   : {
				status               : true,
				partner_entity_types : ['cogoport'],
			},
		},
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'kam_expertise_level',
		label       : t('allocation:by_kam_level_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'select',
		options     : [
			{
				label : '1',
				value : '1',
			},
			{
				label : '2',
				value : '2',
			},
			{
				label : '3',
				value : '3',
			},
			{
				label : '4',
				value : '4',
			},
		],
		caret       : true,
		isClearable : true,
	},
	{
		name        : 'kam_status',
		label       : t('allocation:by_kam_staus_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'select',
		options     : [
			{
				label : t('allocation:active_status_off_label'),
				value : 'active',
			},
			{
				label : t('allocation:active_status_on_label'),
				value : 'inactive',
			},
		],
		caret       : true,
		isClearable : true,
	},
];

export default getControls;
