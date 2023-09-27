const controls = ({ cogo_entity_id = '' }) => [
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
		params      : {
			only_user_service_object_data_required : true,
			filters                                : { partner_id: cogo_entity_id },
		},
	},
];

export default controls;
