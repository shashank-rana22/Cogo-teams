const routeInfo = {
	air_customs : { origin_port: 'airport', origin_pickup: 'location' },
	fcl_customs : {
		origin_pickup         : 'location',
		origin_drop           : '',
		origin_port           : 'port',
		origin_main_port      : 'port_id',
		destination_main_port : '',
		destination_port      : '',
		destination_pickup    : '',
		destination_drop      : '',
	},
	fcl_cfs: {
		origin_pickup         : 'location',
		origin_drop           : '',
		origin_port           : 'port',
		origin_main_port      : 'port_id',
		destination_main_port : '',
		destination_port      : '',
		destination_pickup    : '',
		destination_drop      : '',
	},
	haulage_freight: {
		origin_pickup         : 'origin_pickup',
		origin_drop           : 'origin_drop',
		origin_port           : 'origin_location',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_location',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'destination_drop',
	},
	lcl_customs: {
		origin_pickup         : 'port',
		origin_drop           : '',
		origin_port           : 'location',
		origin_main_port      : 'location_id',
		destination_main_port : '',
		destination_port      : '',
		destination_pickup    : '',
		destination_drop      : '',
	},
	air_freight: {
		origin_pickup         : 'origin_pickup',
		origin_drop           : 'origin_drop',
		origin_port           : 'origin_airport',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_airport',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'destination_drop',
	},
	domestic_air_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_airport',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : 'destination_airport',
		destination_drop      : 'destination_location',
	},
	fcl_freight: {
		origin_pickup         : 'origin_pickup',
		origin_drop           : 'origin_drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'destination_drop',
	},
	ftl_freight: {
		origin_pickup         : 'pickup',
		origin_drop           : 'drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_location',
		destination_main_port : 'destination_location',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'drop',
	},
	lcl_freight: {
		origin_pickup         : 'origin_pickup',
		origin_drop           : 'origin_drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'destination_drop',
		address               : {
			origin_port           : 'origin_pudo',
			origin_main_port      : 'console_point',
			destination_port      : 'destination_pudo',
			destination_main_port : 'deconsole_point',
		},
	},
	ltl_freight: {
		origin_pickup         : 'pickup',
		origin_drop           : 'drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_location',
		destination_main_port : 'destination_location',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'drop',
		address               : {
			origin_port           : 'origin_pudo',
			origin_main_port      : 'console_point',
			destination_port      : 'destination_pudo',
			destination_main_port : 'deconsole_point',
		},
	},
	trailer_freight: {
		origin_location       : 'origin_location',
		origin_pickup         : 'pickup',
		origin_drop           : 'drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'drop',
		destination_location  : 'destination_location',
	},
	air_customs_service: {
		origin_pickup         : '',
		origin_port           : 'airport',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	air_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_airport',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : 'destination_airport',
		destination_drop      : 'destination_location',
	},
	air_freight_local_service: {
		origin_pickup         : 'location',
		origin_port           : 'airport',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	fcl_cfs_service: {
		origin_pickup         : '',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	fcl_customs_service: {
		origin_pickup         : '',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	fcl_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_location',
	},
	fcl_freight_local_service: {
		origin_pickup         : 'location',
		origin_port           : 'port',
		origin_main_port      : '',
		origin_location       : 'origin_location',
		destination_location  : 'destination_location',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
		port_of_loading       : 'port_of_loading',
	},
	ftl_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : 'destination_drop',
		destination_drop      : 'destination_location',
	},
	haulage_freight_service: {
		origin_pickup         : '',
		origin_port           : 'origin_location',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_location',
		destination_drop      : 'destination_location',
	},
	lcl_customs_service: {
		origin_pickup         : 'location',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	lcl_freight_service: {
		origin_pickup         : 'origin_pincode',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_pincode',
		address               : {
			origin_port      : 'console_point',
			destination_port : 'deconsole_point',
		},
	},
	lcl_freight_local_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_location',
	},
	ltl_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_drop',
		destination_drop      : 'destination_location',
	},
	trailer_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_location',
	},
	rail_domestic_freight_service: {
		origin_port           : 'origin_port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_location',
		origin_pickup         : 'origin_location',
	},
};

const getLocationInfo = (
	data,
) => {
	let service_type = data?.service_type || data?.shipment_type;
	if (service_type?.includes('origin')) {
		[, service_type] = service_type.split('origin');
	}

	if (service_type?.includes('destination')) {
		[, service_type] = service_type.split('destination_');
	}

	const serviceRoute = routeInfo[service_type];
	if (serviceRoute) {
		const origin =			data[serviceRoute?.port_of_loading]
			|| data[serviceRoute?.origin_pickup]
			|| data[serviceRoute?.origin_port]
			|| data[serviceRoute?.origin_main_port]
			|| data[serviceRoute?.origin_location];

		let destination =			data[serviceRoute?.destination_drop]
			|| data[serviceRoute?.destination_port]
			|| data[serviceRoute?.destination_main_port]
			|| data[serviceRoute?.destination_location];

		if (data[serviceRoute?.port_of_loading]) {
			destination = data[serviceRoute?.origin_port];
		}

		return { origin, destination };
	}

	return { origin: null, destination: null };
};

export default getLocationInfo;
