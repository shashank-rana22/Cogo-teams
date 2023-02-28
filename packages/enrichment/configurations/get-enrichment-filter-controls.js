const enrichmentFilters = [

	{
		name           : 'organization_id',
		type           : 'asyncSelect',
		label          : 'Organization',
		placeholder    : 'Select Organization',
		defaultOptions : false,
		asyncKey       : 'organizations',
		initialCall    : false,
		isClearable	   : true,

	},
	{
		name        : 'created_at_greater_than',
		placeholder : 'Select Start Date',
		type        : 'datePicker',
		// showTimeSelect : true,
		dateFormat  : 'MMM d, yyyy, hh:mm a',
	},
	{
		name        : 'created_at_less_than',
		placeholder : 'Select End Date',
		type        : 'datePicker',
		// showTimeSelect : true,
		dateFormat  : 'MMM d, yyyy, hh:mm a',
	},
];

export default enrichmentFilters;
