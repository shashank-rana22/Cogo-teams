export const TRANSACTIONAL_KEYS_MAPPING = {
	fcl_freight: {

		origin      : 'origin_port',
		destination : 'destination_port',

	},

	lcl_freight: {

		origin      : 'origin_port',
		destination : 'destination_port',

	},

	air_freight: {

		origin      : 'origin_airport',
		destination : 'destination_airport',

	},

	ltl_freight: {
		origin      : 'pickup',
		destination : 'drop',
	},

	ftl_freight: {
		origin      : 'pickup',
		destination : 'drop',

	},

	trailer_freight: {

		origin      : 'origin_airport',
		destination : 'destination_airport',

	},
};
