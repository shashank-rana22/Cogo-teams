const controls = () => [
	{
		name        : 'agent_id',
		label       : 'Select Agent',
		type        : 'async_select',
		placeholder : 'Select Agent',
		asyncKey    : 'partner_users',
		initialCall : true,
		labelKey    : 'name',
		valueKey    : 'id',
		span        : 3,
		isClearable : true,
		rules       : { required: 'Agent is required' },
		size        : 'sm',
		params      : { only_user_service_object_data_required: true },
	},
];

export default controls;
