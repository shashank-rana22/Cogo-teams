const filterControls = [

	{
		name    : 'blCategory',
		type    : 'select',
		label   : 'AWB Category',
		options : [
			{ value: 'hawb', label: 'HAWB' },
			{ value: 'mawb', label: 'MAWB' },
		],
		placeholder : 'Select',
		span        : 6,
	},
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Carrier',
		placeholder : 'select',
		span        : 6,
	},
	{
		name        : 'originAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : 'Origin Airport',
		placeholder : 'select',
		span        : 6,
	},
	{
		name        : 'destinationAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : 'Destination Airport',
		placeholder : 'select',
		span        : 6,
	},

];
export default filterControls;
