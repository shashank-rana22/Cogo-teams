const filterControls = [
	{
		name    : 'blCategory',
		type    : 'select',
		label   : 'AWB Category',
		options : [
			{ value: 'hawb', label: 'HAWB' },
			{ value: 'mawb', label: 'MAWB' },
		],
		placeholder : 'Select AWB Category',
		span        : 6,
	},
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Carrier',
		placeholder : 'Select Airline',
		span        : 6,
	},
	{
		name        : 'originAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		span        : 6,
	},
	{
		name        : 'destinationAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : 'Destination Airport',
		placeholder : 'Select Destination Airport',
		span        : 6,
	},
	{
		name                  : 'cargoHandedOverAtOriginAt',
		type                  : 'date_picker',
		label                 : 'Handover Date',
		placeholder           : 'Handover Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
	},

];
export default filterControls;
