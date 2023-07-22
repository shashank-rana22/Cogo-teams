const controls = [
	{
		name        : 'cogo_entity_id',
		label       : 'Select Cogo Entity',
		type        : 'async-select',
		placeholder : 'Select Cogo Entity',
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
		name        : 'organization_type',
		label       : 'Organization Type',
		type        : 'select',
		showAstrick : true,
		options     : [
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
		name        : 'organization_sub_type',
		showAstrick : true,
		label       : 'Organization Sub-Type',
		type        : 'select',
	},
	{
		name        : 'h',
		label       : 'Select Teams by Reporting Manager',
		type        : 'async-select',
		placeholder : 'Select Organization',
		initialCall : true,
		asyncKey    : 'partners',
		params      : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
	},
	{
		name        : 'a',
		label       : 'Select Organization',
		type        : 'async-select',
		placeholder : 'Select Organization',
		initialCall : true,
		asyncKey    : 'partners',
		params      : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
	},
	{
		name    : 'booking_platform',
		label   : 'Booking Platform',
		type    : 'multi-select',
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
				value : 'cp_platform',
				label : 'CP',
			},
			{
				value : 'app_platform',
				label : 'APP',
			},
		],
	},
];

export default controls;
