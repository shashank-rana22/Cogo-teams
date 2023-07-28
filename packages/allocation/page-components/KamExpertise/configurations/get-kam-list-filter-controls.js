const controls = [
	{
		name        : 'manager_name',
		label       : 'By Manager Name',
		placeholder : 'select',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		initialCall : true,
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'role',
		label       : 'By Role',
		placeholder : 'select',
		type        : 'asyncSelect',
		caret       : true,
		asyncKey    : 'partner_roles',
		initialCall : true,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types: ['cogoport'],
			},
		},
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'kam_level',
		label       : 'By KAM Level',
		placeholder : 'select',
		type        : 'select',
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'kam_status',
		label       : 'By KAM Status',
		placeholder : 'select',
		type        : 'select',
		options     : [
			{
				label : 'Active',
				value : 'active',
			},
			{
				label : 'Inactive',
				value : 'inactive',
			},
			{
				label : 'Blocked',
				value : 'blocked',
			},
		],
		caret       : true,
		isClearable : true,
	},
];

export default controls;
