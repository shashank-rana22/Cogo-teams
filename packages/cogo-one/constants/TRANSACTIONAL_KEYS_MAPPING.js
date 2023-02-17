export const TRANSACTIONAL_KEYS_MAPPING = {
	fcl_freight: {
		name: {
			origin      : 'origin_port',
			destination : 'destination_port',
		},
	},
	lcl_freight: {
		name: {
			origin      : 'origin_port',
			destination : 'destination_port',
		},
	},
	air_freight: {
		name: {
			origin      : 'origin_airport',
			destination : 'destination_airport',
		},
	},
	ltl_freight: {
		name: {
			origin      : 'pickup',
			destination : 'drop',
		},
	},
	ftl_freight: {
		name: {
			origin      : 'pickup',
			destination : 'drop',
		},
	},
};
