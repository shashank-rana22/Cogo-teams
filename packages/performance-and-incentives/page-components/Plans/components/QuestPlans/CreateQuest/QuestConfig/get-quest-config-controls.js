const getControls = ({ config_id }) => {
	const controls = [
		{
			name        : 'agent_scoring_block_id',
			label       : 'Block',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'agent_scoring_blocks',
			initialCall : true,
			params      : { filters: { agent_scoring_config_id: config_id } },
			rules       : { required: 'Required' },
		},
		{
			name        : 'agent_scoring_parameter_id',
			label       : 'Parameter',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'agent_scoring_',
			initialCall : true,
			params      : { filters: { agent_scoring_config_id: config_id } },
			rules       : { required: 'Required' },
		},
	];

	return controls;
};
export default getControls;
