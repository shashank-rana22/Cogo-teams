const controls = [
	{
		name        : 'main_port_id',
		label       : 'Select Main Port',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['seaport'] } },
		caret       : true,
		placeholder : 'Search ',
		rules       : { required: 'This is required' },
	},
];

export default controls;
