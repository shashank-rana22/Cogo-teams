const clearance_date_report_controls = [
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Airline Name',
		placeholder : 'Select Airline...',
		initialCall : true,
		span        : 6,
	},
	{
		name        : 'airportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
	},
	{
		name        : 'destinationLocationId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Destination Airport',
		placeholder : 'Select Destination Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
	},
	{
		name                  : 'bookingDate',
		type                  : 'date_picker',
		label                 : 'Booking Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
	},
	{
		name                  : 'customClearanceDate',
		type                  : 'date_picker',
		label                 : 'Custom Clearance Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
	},
];
export default clearance_date_report_controls;
