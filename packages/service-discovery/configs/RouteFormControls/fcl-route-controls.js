const fclRouteControls = [
	{
		name        : 'origin_location_id',
		type        : 'async-select',
		label       : 'Origin Point',
		placeholder : 'City, Port or Pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Origin is required' },
	},
	{
		name        : 'destination_location_id',
		type        : 'async-select',
		label       : 'Destination Point',
		placeholder : 'City, Port or Pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Destination is required' },
	},

];

export default fclRouteControls;
