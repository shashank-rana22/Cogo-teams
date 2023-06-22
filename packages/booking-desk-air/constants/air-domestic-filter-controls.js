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

];
export default domesticAirFreightControls;
