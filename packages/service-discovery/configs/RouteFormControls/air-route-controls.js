const airRouteControls = [
	{
		name        : 'origin_airport_id',
		type        : 'async-select',
		label       : 'Origin Point',
		placeholder : 'City, Airport or Pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Origin is required' },
	},
	{
		name        : 'destination_airport_id',
		type        : 'async-select',
		label       : 'Destination Point',
		placeholder : 'City, Airport or Pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Destination is required' },
	},

];

export default airRouteControls;
