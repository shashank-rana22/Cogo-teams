import CHANNEL_OPTIONS from '../constants/select-channel-options';

const getScoreApplicableFormControls = ({ cogoEntityId, roleFunction, channel }) => ([
	{
		name        : 'display_name',
		label       : 'Display Name',
		type        : 'text',
		placeholder : 'Enter Name',
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'cogo_entity_id',
		label       : 'Select Cogo Entity',
		type        : 'asyncSelect',
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
		rules: { required: 'Cogo Entity is required' },
	},
	{
		name    : 'role_function',
		label   : 'Function',
		type    : 'select',
		options : [
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Supply',
				value : 'supply',
			},
			{
				label : 'Operations',
				value : 'operations',
			},
			{
				label : 'Finance',
				value : 'finance',
			},
			{
				label : 'training',
				value : 'Training',
			},
			{
				label : 'HR',
				value : 'hr',
			},
			{
				label : 'External',
				value : 'external',
			},
		],
		rules: { required: 'Role function is required' },
	},
	{
		name    : 'channel',
		label   : 'Channel',
		type    : 'select',
		options : CHANNEL_OPTIONS[roleFunction] || [],
		rules   : { required: 'Channel is required' },
	},
	{
		name        : 'role_ids',
		label       : 'Select Roles',
		type        : 'asyncSelect',
		multiple    : true,
		placeholder : 'Select Roles',
		initialCall : true,
		asyncKey    : 'agent_scoring_eligible_roles',
		params      : {
			cogo_entity_ids : cogoEntityId ? [cogoEntityId] : undefined,
			functions       : roleFunction ? [roleFunction] : undefined,
			channels        : channel ? [channel] : undefined,
			status          : true,
		},
		rules: { required: 'Roles are required' },
	},
]);

export default getScoreApplicableFormControls;
