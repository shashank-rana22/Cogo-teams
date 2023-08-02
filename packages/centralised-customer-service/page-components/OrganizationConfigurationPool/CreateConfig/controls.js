import { isEmpty } from '@cogoport/utils';

const getControls = ({ cogoEntityId = '', reportingManagerIds = '' }) => ([
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
		label       : 'Select Reporting Manager',
		type        : 'async-select',
		isClearable : true,
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
		multiple    : true,
		asyncKey    : 'organizations',
		isClearable : true,
		params      : {
			filters: {
				...(!isEmpty(reportingManagerIds) ? {
					sales_agent_rm_id: reportingManagerIds,
				} : {}),
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
		name        : 'booking_source',
		label       : 'Booking Platform',
		type        : 'select',
		isClearable : true,
		options     : [
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
]);

const preferredRoleControls = {
	name        : 'preferred_role_id',
	label       : 'Select Role for CCS Config Pool',
	placeholder : 'Select Role',
	initialCall : true,
	asyncKey    : 'partner_roles',
	isClearable : true,
	params      : {
		filters: {
			role_functions     : ['operations'],
			role_sub_functions : [
				'common_customer_operations',
				'enterprise_customer_operations',
				'mid_size_customer_operations',
				'cp_customer_operations'],
			status: 'active',
		},
	},
};

export { getControls, preferredRoleControls };
