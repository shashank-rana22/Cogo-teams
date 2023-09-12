const domesticAirFreightControls = (t = () => {}) => ([
	{
		name           : 'origin_airport_id',
		label          : t('airBookingDesk:label_origin_airport'),
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
		label          : t('airBookingDesk:label_destination_airport'),
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
		label       : t('airBookingDesk:label_state'),
		type        : 'select',
		placeholder : t('airBookingDesk:placeholder_state'),
		options     : [
			{
				label : t('airBookingDesk:state_awaiting_confirmation'),
				value : 'awaiting_service_provider_confirmation',
			},
			{
				label : t('airBookingDesk:state_confirmed_by_service_provider'),
				value : 'confirmed_by_service_provider',
			},
			{
				label : t('airBookingDesk:state_cargo_handed_over_at_origin'),
				value : 'cargo_handed_over_at_origin',
			},
			{
				label : t('airBookingDesk:state_flight_departed'),
				value : 'flight_departed',
			},
			{
				label : t('airBookingDesk:state_flight_arrived'),
				value : 'flight_arrived',
			},
			{
				label : t('airBookingDesk:state_cargo_handed_over_at_destination'),
				value : 'cargo_handed_over_at_destination',
			},
		],
		isClearable : true,
		span        : 6,
	},

]);

export default domesticAirFreightControls;
