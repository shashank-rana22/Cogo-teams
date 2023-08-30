const CALLS_FILTER_CONTROLS = [
	{
		label          : 'Agents',
		name           : 'agent',
		controllerType : 'asyncSelect',
		asyncKey       : 'partner_users',
		initialCall    : true,
		value          : '',
		multiple       : true,
		valueKey       : 'user_id',
		placeholder    : 'Select by Name/Email',
		isClearable    : true,
	},
];

export default CALLS_FILTER_CONTROLS;
