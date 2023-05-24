export const CreateTdsFilters = [
	{
		name        : 'orgId',
		type        : 'asyncSelect',
		placeholder : 'Business Partner',
		asyncKey    : 'trade_party_details',
		isClearable : true,
		initialCall : true,
		valueKey    : 'id',
		span        : 4.5,
		style       : { width: '300px' },

	},

	{
		name                  : 'date',
		placeholder           : 'Select Date',
		type                  : 'singleDateRange',
		maxDate               : new Date(),
		isPreviousDaysAllowed : true,
		caret                 : true,
		isClearable           : true,
		defaultValue          : null,
		span               	  : 6,
	},
];
