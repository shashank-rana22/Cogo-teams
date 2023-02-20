const quotasCreateControls = [
	{
		name    : 'role_type',
		label   : 'Role Type',
		type    : 'radio',
		options : [
			{
				label : 'Role',
				value : 'role',
			},
			{
				label : 'User',
				value : 'user',
			},
		],
	},
	{
		name           : 'user_id',
		label          : 'Partner User',
		type           : 'asyncSelect',
		valueKey       : 'user_id',
		placeholder    : 'Select partner user',
		asyncKey       : 'partner_users',
		defaultOptions : true,
		params         : {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
		rules: {
			required: 'User is Required',
		},
	},
	{
		name        : 'role_id',
		label       : 'Role',
		type        : 'select',
		asyncKey    : 'partner_roles',
		placeholder : 'Select role',
		valueKey    : 'id',
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types: ['cogoport'],
			},
		},
		rules: {
			required: 'Role is required',
		},
	},
];

export default quotasCreateControls;
