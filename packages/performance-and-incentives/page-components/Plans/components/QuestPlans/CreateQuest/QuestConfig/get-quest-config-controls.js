const getControls = ({ config_id, agent_scoring_block_name = null, agent_scoring_block_id = null }) => {
	const controls = [
		{
			name        : 'agent_scoring_block_name',
			label       : 'Block',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'agent_scoring_blocks',
			initialCall : true,
			valueKey    : 'name',
			params      : { list_blocks_required_only: true, filters: { agent_scoring_config_id: config_id } },
			rules       : { required: 'Required' },
		},
		{
			name        : 'agent_scoring_block_id',
			label       : 'Block',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'agent_scoring_blocks',
			labelKey    : 'sub_block_name',
			initialCall : true,
			disabled    : !agent_scoring_block_name,
			params      : { filters: { agent_scoring_config_id: config_id, name: agent_scoring_block_name } },
			rules       : { required: 'Required' },
		},
		{
			name        : 'agent_scoring_parameter_id',
			label       : 'Parameter',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'agent_scoring_parameters',
			initialCall : true,
			disabled    : !agent_scoring_block_id,
			params      : { filters: { agent_scoring_config_id: config_id, agent_scoring_block_id } },
			rules       : { required: 'Required' },
		},
	];

	return controls;
};
export default getControls;
