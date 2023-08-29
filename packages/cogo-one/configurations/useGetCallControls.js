const useGetCallControls = () => {
	const controls = [
		{
			label          : 'Agents',
			name           : 'agent',
			controllerType : 'asyncSelect',
			asyncKey       : 'partner_users',
			initialCall    : true,
			value          : '',
			multiple       : true,
			valueKey       : 'user_id',
			className      : 'escalation_field_controller',
			placeholder    : 'Select by Name/Email',
			isClearable    : true,
		},
	];

	return controls;
};

export default useGetCallControls;
