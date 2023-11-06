const dashboardFilters = () => [
	{
		name                  : 'date_range',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		showTimeSelect        : false,
		controlType           : 'dateRangePicker',
		isClearable           : false,
	},
];

export default dashboardFilters;
