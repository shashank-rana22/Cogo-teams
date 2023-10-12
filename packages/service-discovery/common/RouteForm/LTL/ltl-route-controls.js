const ltlRouteControls = [
	{
		name        : 'origin_location_id',
		type        : 'async-select',
		label       : 'Pickup Point',
		placeholder : 'Search via port name/code or pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Pickup Point is required' },
	},
	{
		name        : 'destination_location_id',
		type        : 'async-select',
		label       : 'Delivery Point',
		placeholder : 'Search via port name/code or pin',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		rules       : { required: 'Pickup Point is required' },
	},

];

export default ltlRouteControls;
