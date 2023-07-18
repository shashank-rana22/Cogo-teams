const getPayload = ({
	// rateCardData = {},
	additionalFormInfo = {},
	detail = {},
	service_name = '',
	source = 'spot_search',
}) => {
	const {
		origin_warehouse_id = '',
		destination_warehouse_id = '',
		destination_cargo_handling_type = '',
		origin_cargo_handling_type = '',
		cargo_value_currency = '',
		cargo_value = '',
		truck_type = '',
		trucks_count = '',
		haulage_type = '',
	} = additionalFormInfo;

	const { spot_search_id, bls_count = '', service_details = {}, service_type = '' } = detail;
	const primaryService = service_type;

	const primaryServicesObj = Object.values(service_details).filter((item) => item.service_type === primaryService);

	const mapping = {
		export: {
			destination_location_id : detail?.origin_port_id,
			origin_location_id      : origin_warehouse_id,
			port_id                 : detail?.origin_port_id,
			trade_type              : 'export',
			cargo_handling_type     : origin_cargo_handling_type,
		},
		import: {
			destination_location_id : destination_warehouse_id,
			origin_location_id      : detail?.destination_port_id,
			port_id                 : detail?.destination_port_id,
			trade_type              : 'import',
			cargo_handling_type     : destination_cargo_handling_type,
		},
	};

	const {
		destination_location_id,
		origin_location_id,
		port_id,
		trade_type,
		cargo_handling_type,
	} = mapping[service_name.includes('export') ? 'export' : 'import'];

	if (service_name === 'export_transportation') {
		const payload = {
			id      : spot_search_id,
			service : origin_cargo_handling_type === 'stuffing_at_factory' ? 'trailer_freight' : 'ftl_freight',
			...origin_cargo_handling_type === 'stuffing_at_factory' ? {
				trailer_freight_services: primaryServicesObj.map((item) => ({
					origin_location_id,
					destination_location_id,
					container_size             : item.container_size,
					container_type             : item.container_type,
					commodity                  : item.commodity,
					containers_count           : item.containers_count,
					cargo_weight_per_container : item.cargo_weight_per_container,
					status                     : 'active',
					trade_type,
				})),
			} : {
				ftl_freight_services: primaryServicesObj.map((item) => ({
					origin_location_id,
					destination_location_id,
					container_size   : item.container_size,
					container_type   : item.container_type,
					commodity        : item.commodity,
					containers_count : item.containers_count,
					status           : 'active',
					trade_type,
					trucks_count,
					truck_type,
					volume           : 1,
					weight           : 1,
					trip_type        : 'one_Way',
				})),
			},
		};

		return payload;
	}

	if (service_name === 'import_transportation') {
		const payload = {
			id      : spot_search_id,
			service : destination_cargo_handling_type !== 'destuffing_at_dock' ? 'trailer_freight' : 'ftl_freight',
			...destination_cargo_handling_type !== 'destuffing_at_dock' ? {
				trailer_freight_services: primaryServicesObj.map((item) => ({
					origin_location_id,
					destination_location_id,
					container_size             : item.container_size,
					container_type             : item.container_type,
					commodity                  : item.commodity,
					containers_count           : item.containers_count,
					cargo_weight_per_container : item.cargo_weight_per_container,
					status                     : 'active',
					trade_type,
				})),
			} : {
				ftl_freight_services: primaryServicesObj.map((item) => ({
					origin_location_id,
					destination_location_id,
					container_size   : item.container_size,
					container_type   : item.container_type,
					commodity        : item.commodity,
					containers_count : item.containers_count,
					status           : 'active',
					trade_type,
					trucks_count,
					truck_type,
					volume           : 1,
					weight           : 1,
					trip_type        : 'one_Way',
				})),
			},
		};

		return payload;
	}

	if (service_name.includes('fcl_freight_local')) {
		const payload = {
			id                         : spot_search_id,
			service                    : 'fcl_freight_local',
			fcl_freight_local_services : primaryServicesObj.map((item) => ({
				port_id,
				container_size             : item.container_size,
				container_type             : item.container_type,
				commodity                  : item.commodity,
				containers_count           : item.containers_count,
				bls_count,
				cargo_weight_per_container : item.cargo_weight_per_container,
				status                     : 'active',
				trade_type,
				// cargo_handling_type,
			})),

		};

		return payload;
	}

	if (service_name.includes('haulage_freight')) {
		const payload = {
			id                       : spot_search_id,
			service                  : 'haulage_freight',
			haulage_freight_services : primaryServicesObj.map((item) => ({
				...trade_type === 'export'
					? { origin_location_id: detail?.origin_port_id }
					: { destination_location_id: detail?.destination_port_id },
				container_size             : item.container_size,
				container_type             : item.container_type,
				commodity                  : item.commodity,
				containers_count           : item.containers_count,
				cargo_weight_per_container : item.cargo_weight_per_container,
				haulage_type,
				status                     : 'active',
				trade_type,
				transport_mode             : 'rail',
			})),

		};

		return payload;
	}

	if (service_name.includes('fcl_cfs')) {
		const payload = {
			id               : spot_search_id,
			service          : 'fcl_cfs',
			fcl_cfs_services : primaryServicesObj.map((item) => ({
				port_id,
				container_size   : item.container_size,
				container_type   : item.container_type,
				commodity        : item.commodity,
				containers_count : item.containers_count,
				bls_count,
				status           : 'active',
				trade_type,
				cargo_handling_type,
				cargo_value,
				cargo_value_currency,
			})),
		};

		return payload;
	}

	if (service_name.includes('fcl_customs')) {
		const payload = {
			id                   : spot_search_id,
			service              : 'fcl_customs',
			fcl_customs_services : primaryServicesObj.map((item) => ({
				port_id,
				container_size   : item.container_size,
				container_type   : item.container_type,
				commodity        : item.commodity,
				containers_count : item.containers_count,
				bls_count,
				status           : 'active',
				trade_type,
				cargo_handling_type,
			})),
		};

		return payload;
	}
	return {};
};

export default getPayload;
