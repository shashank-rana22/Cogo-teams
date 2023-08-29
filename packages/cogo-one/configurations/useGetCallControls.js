const useGetCallControls = () => {
	const controls = [
		{
			label          : 'Agent',
			name           : 'agent',
			controllerType : 'asyncSelect',
			asyncKey       : 'partner_users',
			initialCall    : true,
			value          : '',
			finalValueKey  : 'user_id',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Agent Name or email',
			isClearable    : true,
			// size           : 'sm',
		},
		// {
		// 	label          : 'User',
		// 	labelKey       : 'name',
		// 	name           : 'user',
		// 	controllerType : 'asyncSelect',
		// 	value          : '',
		// 	finalValueKey  : 'user_id',
		// 	asyncKey       : 'organization_users',
		// 	className      : 'escalation_field_controller',
		// 	// filterKey      : 'organization_id',
		// 	placeholder    : 'Select User',
		// 	isClearable    : true,
		// 	// size           : 'sm',
		// },
		{
			label          : 'User Number',
			name           : 'user_number',
			controllerType : 'input',
			placeholder    : 'Enter here',
			// size           : 'sm',
			type           : 'number',
		},
	];

	return controls;
};

export default useGetCallControls;
