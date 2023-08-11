const domesticAirFreightControls = [
	{
		name           : 'origin_airport_id',
		label          : 'Origin Airport',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'airport',
				],
			},
		},
		isClearable : true,
		span        : 6,
	},
	{
		name           : 'destination_airport_id',
		label          : 'Destination Airport',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'airport',
				],
			},
		},
		isClearable : true,
		span        : 6,
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'select',
		placeholder : 'Select State',
		options     : [
			{
				label : 'Awaiting service provider confirmation',
				value : 'awaiting_service_provider_confirmation',
			},
			{
				label : 'Confirmed by service provider',
				value : 'confirmed_by_service_provider',
			},
			{
				label : 'Cargo handed over at origin',
				value : 'cargo_handed_over_at_origin',
			},
			{
				label : 'Flight departed',
				value : 'flight_departed',
			},
			{
				label : 'Flight arrived',
				value : 'flight_arrived',
			},
			{
				label : 'Cargo handed over at destination',
				value : 'cargo_handed_over_at_destination',
			},
		],
		isClearable : true,
		span        : 6,
	},

];
export default domesticAirFreightControls;
