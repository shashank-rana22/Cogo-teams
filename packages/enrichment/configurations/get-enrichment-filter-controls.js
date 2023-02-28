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
		size        : 'lg',

	},
	{
		name        : 'created_at_less_than',
		placeholder : 'Select End Date',
		type        : 'datePicker',
		size        : 'lg',

	},
];

export default enrichmentFilters;
