export const CHECKOUT_PORT_PAIR_MAPPING = {
	fcl_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'origin_port',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',
	},

	fcl_customs: {
		origin_pickup    : 'origin_location',
		origin_port      : 'port',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',
	},

	fcl_freight_local: {
		origin_pickup    : 'origin_location',
		origin_port      : 'port',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',
	},

	lcl_freight: {
		origin_pickup    : 'origin_pincode',
		origin_port      : 'origin_port',
		destination_port : 'destination_port',
		destination_drop : 'destination_pincode',

	},

	lcl_customs: {
		origin_pickup    : 'location',
		origin_port      : 'port',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',
	},

	lcl_freight_local: {
		origin_pickup    : 'origin_location',
		origin_port      : 'port',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',
	},

	air_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'origin_airport',
		destination_port : 'destination_airport',
		destination_drop : 'destination_location',

	},

	air_customs: {
		origin_pickup    : 'origin_location',
		origin_port      : 'airport',
		destination_port : 'destination_port',
		destination_drop : 'destination_location',

	},

	domestic_air_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'origin_airport',
		destination_port : 'destination_airport',
		destination_drop : 'destination_location',
	},

	air_freight_local: {
		origin_pickup    : 'origin_location',
		origin_port      : 'airport',
		destination_port : 'destination_airport',
		destination_drop : 'destination_location',
	},

	ltl_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'pickup',
		destination_port : 'drop',
		destination_drop : 'destination_location',
	},

	ftl_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'pickup',
		destination_port : 'drop',
		destination_drop : 'destination_location',

	},

	trailer_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'pickup',
		destination_port : 'drop',
		destination_drop : 'destination_location',

	},

	haulage_freight: {
		origin_pickup    : 'origin_location',
		origin_port      : 'pickup',
		destination_port : 'drop',
		destination_drop : 'destination_location',
	},

};
