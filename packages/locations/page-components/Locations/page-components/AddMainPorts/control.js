const controls = [
	{
		name           : 'main_port_id',
		label          : 'Select Main Port',
		type           : 'async_select',
		optionsListKey : 'locations',
		asyncKey       : 'list_locations',
		className      : 'primary sm',
		params         : { filters: { type: ['seaport'] } },
		caret          : true,
		placeholder    : 'Search ',
		rules          : { required: 'This is required' },
	},
];

export default controls;
