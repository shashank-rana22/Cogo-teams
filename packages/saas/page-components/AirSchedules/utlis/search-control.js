const controls = [
	{
		name           : 'origin',
		type           : 'async_select',
		asyncKey       : 'list_locations',
		placeholder    : 'Enter departure airport',
		value          : '',
		optionsListKey : 'locations',
		params         : { filters: { type: ['airport'] } },
		rules          : { required: 'Please enter value' },
	},
	{
		name           : 'destination',
		type           : 'async_select',
		asyncKey       : 'list_locations',
		placeholder    : 'Enter arrival airport',
		params         : { filters: { type: ['airport'] } },
		value          : '',
		optionsListKey : 'locations',
		rules          : { required: 'Please enter value' },
	},
];

export default controls;
