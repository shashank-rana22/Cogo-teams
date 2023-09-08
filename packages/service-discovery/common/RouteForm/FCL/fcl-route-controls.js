const fclRouteControls = [
	{
		name        : 'origin_location_id',
		type        : 'async-select',
		label       : 'Origin Point',
		placeholder : 'Search via port name/code or pin',
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
		placeholder : 'Search via port name/code or pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Destination is required' },
	},

];

export default fclRouteControls;
