export const PARAM_MAPPING = {
	fcl_freight: {
		origin_location      : 'origin_port_id',
		destination_location : 'destination_port_id',
		operater_type        : 'shipping_line_id',

	},
	lcl_freight: {
		origin_location      : 'origin_port_id',
		destination_location : 'destination_port_id',
	},
	lcl_customs: {
		location: 'location_id',
	},
	air_customs: {
		location: 'airport_id',
	},
	trailer: {
		origin_location      : 'origin_location_id',
		destination_location : 'destination_location_id',
		operater_type        : 'shipping_line_id',
	},
	ltl_freight: {
		origin_location      : 'origin_location_id',
		destination_location : 'destination_location_id',
	},
	air_freight: {
		origin_location      : 'origin_airport_id',
		destination_location : 'destination_airport_id',
		operater_type        : 'airline_id',

	},
	haulage: {
		origin_location      : 'origin_location_id',
		destination_location : 'destination_location_id',
		operater_type        : 'shipping_line_id',
	},
	fcl_customs: {
		location: 'location_id',
	},
	ftl_freight: {
		origin_location      : 'origin_location_id',
		destination_location : 'destination_location_id',
	},
	fcl_cfs: {
		location: 'location_id',
	},
	fcl_freight_local: {
		location: 'port_id',
	},
	air_freight_local: {
		location: 'airport_id',
	},
};
