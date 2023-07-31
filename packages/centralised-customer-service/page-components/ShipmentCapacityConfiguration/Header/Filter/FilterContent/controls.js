const controls = [
	{
		label       : 'Filter By Cogo Entity',
		name        : 'cogo_entity_id',
		asyncKey    : 'partners',
		type        : 'async-select',
		initialCall : true,
		params      : {
			filters: {
				entity_types   : ['cogoport'],
				current_status : 'active',
			},
			page_limit: 10,
		},
	},
	{
		name        : 'role_id',
		label       : 'Select Role',
		type        : 'async-select',
		placeholder : 'Select Role',
		initialCall : true,
		asyncKey    : 'partner_roles',
		params      : {
			filters: {
				role_functions     : ['operations'],
				role_sub_functions : ['enterprise_customer_operations',
					'mid_size_customer_operations', 'cp_customer_operations'],
				status: 'active',
			},
		},
	},
	{
		label   : 'Status',
		name    : 'status',
		type    : 'select',
		options : [
			{ label: 'Draft', value: 'draft' },
			{ label: 'Active', value: 'active' },
		],
	},
];

export default controls;
