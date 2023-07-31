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
		name    : 'organization_type',
		label   : 'Organization Type',
		type    : 'select',
		options : [
			{
				value : 'importer_exporter',
				label : 'Importer Exporter',
			},
			{
				value : 'channel_partner',
				label : 'Channel Partner',
			},
		],

	},
	{
		name    : 'segment',
		label   : 'Organization Sub-Type',
		type    : 'select',
		options : [{
			value : 'long_tail',
			label : 'Long Tail',
		},
		{
			value : 'mid_size',
			label : 'Mid Size',
		},
		{
			value : 'enterprise',
			label : 'Enterprise',
		},
		{
			value : 'overseas_cp',
			label : 'Overseas CP',
		},
		{
			value : 'domestic_cp',
			label : 'Domestic CP',
		},
		{
			value : 'not_defined',
			label : 'Unknown',
		}],
	},
	{
		name        : 'agent_id',
		label       : 'Agent',
		type        : 'async-select',
		initialCall : true,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		params      : {
			filters: {
				status       : 'active',
				block_access : [null, false],
			},
		},
	},
	{
		name    : 'booking_source',
		label   : 'Booking Platform',
		type    : 'select',
		options : [
			{
				value : 'admin_platform',
				label : 'Admin',
			},
			{
				value : 'cogoverse',
				label : 'Cogoverse',
			},
			{
				value : 'app_platform',
				label : 'APP/CP',
			},
		],
	},
	{
		label   : 'Priority',
		name    : 'config_type',
		type    : 'select',
		options : [
			{ label: 'Primary', value: 'primary' },
			{ label: 'Fallback', value: 'fallback' },
		],
	},
	{
		name        : 'preferred_role_id',
		label       : 'Select Role for CCS Config Pool',
		placeholder : 'Select Role',
		type        : 'async-select',
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
];

export default controls;
