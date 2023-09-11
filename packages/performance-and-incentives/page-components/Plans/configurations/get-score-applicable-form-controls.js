const getScoreApplicableFormControls = ({ cogoEntityId, roleFunction, channel, channelOptions }) => ([
	{
		name        : 'display_name',
		label       : 'Display Name',
		type        : 'text',
		placeholder : 'Enter Name',
		rules       : { required: 'This is required' },
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
		rules: { required: 'This is required' },
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
		rules: { required: 'This is required' },
	},
	{
		name    : 'channel',
		label   : 'Channel',
		type    : 'select',
		options : channelOptions,
		rules   : { required: 'This is required' },
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
		style : { flexBasis: '27%' },
		rules : { required: 'This is required' },
	},
]);

export default getScoreApplicableFormControls;
