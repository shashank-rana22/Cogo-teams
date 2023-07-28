const controls = [
	{
		label    : 'Filter By Cogo Entity',
		name     : 'cogo_entity_id',
		asyncKey : 'partners',
		type     : 'async-select',
		params   : {
			filters: {
				entity_types   : ['cogoport'],
				current_status : 'active',
			},
			page_limit: 10,
		},
	},
	{
		name        : 'organization_ids',
		label       : 'Organizations',
		type        : 'async-select',
		placeholder : 'Select Organization',
		initialCall : true,
		multiple    : true,
		asyncKey    : 'organizations',
		params      : {
			filters: {
				status       : 'active',
				account_type : 'importer_exporter',
				kyc_status   : 'verified',
			},
			pagination_data_required     : false,
			agent_data_required          : false,
			add_service_objects_required : false,
			page_limit                   : 99999999,
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
		name        : 'segment',
		showAstrick : true,
		label       : 'Organization Sub-Type',
		type        : 'select',
	},
	{
		name        : 'agent_id',
		label       : 'Agent',
		type        : 'async-select',
		placeholder : 'Select Organization',
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
