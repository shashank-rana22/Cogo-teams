const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter Name',
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'agent_scoring_config_id',
		label       : 'Config',
		placeholder : 'Select',
		type        : 'asyncSelect',
		asyncKey    : 'agent_scoring_configs',
		// params      : { page_limit: 20, filters: { status: 'active' } },
		initialCall : true,
		rules       : { required: 'Required' },
	},
	{
		name                  : 'date_range',
		label                 : 'Starts at',
		type                  : 'dateRangePicker',
		isPreviousDaysAllowed : false,
		placeholder           : 'Enter Name',
		rules                 : { required: 'Date range is required' },
	},
	{
		name        : 'quest_string',
		label       : 'Quest String',
		type        : 'text',
		placeholder : 'Enter text',
	},
];

export default controls;
