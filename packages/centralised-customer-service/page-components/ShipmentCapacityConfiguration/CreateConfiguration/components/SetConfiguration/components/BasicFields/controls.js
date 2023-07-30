const controls = [
	{
		name        : 'cogo_entity_id',
		label       : 'Select Cogo Entity',
		type        : 'async-select',
		placeholder : 'Select Cogo Entity',
		showAstrick : true,
		initialCall : true,
		asyncKey    : 'partners',
		params      : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
		rules: { required: 'This is required' },
	},
	{
		name        : 'role_id',
		label       : 'Select Role for CCS Config Pool',
		type        : 'async-select',
		placeholder : 'Select Role',
		initialCall : true,
		asyncKey    : 'partner_roles',
		params      : {
			filters: {
				role_sub_functions : ['operations'],
				sub_functions      : ['enterprise_customer_operations',
					'mid_size_customer_operations', 'cp_customer_operations'],
				status: 'active',
			},
		},
		rules: { required: 'This is required' },
	},
];

export default controls;
