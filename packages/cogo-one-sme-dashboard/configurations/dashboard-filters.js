const dashboardFilters = ({ setFilterParams = () => {} }) => [
	{
		name                  : 'date_range',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		showTimeSelect        : false,
		controlType           : 'dateRangePicker',
		onChange              : (val) => setFilterParams(
			(prev) => ({
				...prev,
				date_range: val,
			}),
		),
	},
];

export default dashboardFilters;
