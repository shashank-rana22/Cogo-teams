export const PLATFORM_ACTIVITY_KEYS_MAPPING = {
	fcl_freight: {
		origin      : 'origin_port',
		destination : 'destination_port',
	},

	fcl_customs: {
		origin      : 'port',
		destination : 'port',
	},

	fcl_freight_local: {
		origin      : 'port',
		destination : 'port',
	},

	lcl_freight: {
		origin      : 'origin_port',
		destination : 'destination_port',

	},

	lcl_customs: {
		origin      : 'location',
		destination : 'location',
	},

	air_freight: {
		origin      : 'origin_airport',
		destination : 'destination_airport',

	},

	air_customs: {
		origin      : 'airport',
		destination : 'airport',

	},

	air_freight_local: {
		origin      : 'airport',
		destination : 'airport',
	},

	domestic_air_freight: {
		origin      : 'origin_airport',
		destination : 'destination_airport',
	},

	ltl_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',
	},

	ftl_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',

	},

	trailer_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',

	},

	haulage_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',
	},

};
