const filterControls = [

	{
		name        : 'blCategory',
		type        : 'select',
		label       : 'BL Category',
		placeholder : 'Select',
		span        : 6,
	},
	{
		name        : 'carrier',
		type        : 'select',
		label       : 'Carrier',
		placeholder : 'select',
		span        : 6,
	},
	{
		name        : 'originAirport',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'select',
		span        : 6,
	},
	{
		name        : 'destinationAirport',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Destination Airport',
		placeholder : 'select',
		span        : 6,
	},

];
export default filterControls;
