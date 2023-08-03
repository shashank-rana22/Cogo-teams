const controls = [
	{
		name        : 'manager_ids',
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
		name        : 'role_ids',
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
		name        : 'kam_expertise_level',
		label       : 'By KAM Level',
		placeholder : 'select',
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
		],
		caret       : true,
		isClearable : true,
	},
];

export default controls;
