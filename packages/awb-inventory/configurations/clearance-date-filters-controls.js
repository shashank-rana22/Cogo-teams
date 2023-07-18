const clearance_date_report_controls = [
	{
		name        : 'airline_id',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Airline Name',
		placeholder : 'Select Airline...',
		initialCall : true,
		multiple    : true,
		span        : 6,
	},
	{
		name        : 'airport_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		multiple    : true,
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
	},
	{
		name        : 'destination_location_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Destination Airport',
		placeholder : 'Select Destination Airport',
		multiple    : true,
		span        : 6,
		params      : {
			filters: {
				type: ['airport', 'country'],
			},
		},
	},
	{
		name                  : 'booking_date',
		type                  : 'date_picker',
		label                 : 'Booking Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		value                 : new Date(),
		span                  : 6,
	},
	{
		name                  : 'custom_clearance_date',
		type                  : 'date_picker',
		label                 : 'Custom Clearance Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		value                 : new Date(),
		span                  : 6,
	},
];
export default clearance_date_report_controls;
