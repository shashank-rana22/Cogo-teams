const getControls = ({ cogoEntityId = '', reportingManagerIds = '' }) => ([
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
		rules: { required: 'This is required' },

	},
	{
		name        : 'segment',
		showAstrick : true,
		label       : 'Organization Sub-Type',
		type        : 'select',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'agent_id',
		label       : 'Select Teams by Reporting Manager',
		type        : 'async-select',
		placeholder : 'Select Organization',
		initialCall : true,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		params      : {
			filters: {
				partner_id   : cogoEntityId,
				status       : 'active',
				block_access : [null, false],
			},
		},
	},
	{
		name        : 'organization_ids',
		label       : 'Select Organization',
		type        : 'async-select',
		placeholder : 'Select Organization',
		initialCall : true,
		multiple    : true,
		asyncKey    : 'organizations',
		params      : {
			filters: {
				sales_agent_rm_ids : [reportingManagerIds],
				status             : 'active',
				account_type       : 'importer_exporter',
				kyc_status         : 'verified',
			},
			pagination_data_required     : false,
			agent_data_required          : false,
			add_service_objects_required : false,
			page_limit                   : 99999999,
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
				label : 'APP',
			},
		],
	},
]);

export default getControls;
