const formatRates = (selectedRate, shipment_data, service_type_prop = null) => {
	if (!selectedRate) {
		return {};
	}
	const service_type =
		service_type_prop || `${shipment_data.shipment_type}_service`;
	const primary_service = (shipment_data?.all_services || []).find(
		(service) => service.service_type === service_type,
	);
	const origin_local = (shipment_data?.all_services || []).find(
		(service) =>
			service.service_type === `${shipment_data.shipment_type}_local_service` &&
			service.trade_type === 'export',
	);
	const destination_local = (shipment_data?.all_services || []).find(
		(service) =>
			service.service_type === `${shipment_data.shipment_type}_local_service` &&
			service.trade_type === 'export',
	);
	if (
		service_type === 'air_freight_service' &&
		selectedRate.source === 'system_rate'
	) {
		const { data } = selectedRate || {};
		const rate = data[0] || {};

		return {
			id: selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[primary_service.id]: {
				service_provider_id: rate.service_provider_id,
				airline_id: rate.airline_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
								code: item.code,
								name: item.name,
								currency: item.currency,
								price: item.price,
								unit: item.unit,
								quantity: item.quantity,
						  }))
						: undefined,
			},
		};
	}
	if (
		service_type === 'air_freight_service' &&
		selectedRate.source === 'flash_booking'
	) {
		const { data } = selectedRate || {};
		const rate = data[0] || {};

		return {
			id: selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[primary_service.id]: {
				service_provider_id: rate.service_provider_id,
				airline_id: rate.airline_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
								code: item.code,
								name: item.name,
								currency: item.currency,
								price: item.price,
								unit: item.unit,
								quantity: item.quantity,
						  }))
						: undefined,
			},
		};
	}

	if (service_type === 'fcl_freight_service') {
		const { data } = selectedRate || {};
		const rate = data?.[0] || {};

		return {
			id: selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[primary_service.id]: {
				service_provider_id: rate.service_provider_id,
				shipping_line_id: rate.shipping_line_id,
				line_items:
					rate && rate?.line_items
						? rate.line_items?.map((item) => ({
								code: item.code,
								name: item.name,
								currency: item.currency,
								price: item.price,
								unit: item.unit,
								quantity: item.quantity,
						  }))
						: undefined,
			},
		};
	}
	if (
		[
			'ftl_freight_service',
			'ltl_freight_service',
			'fcl_customs_service',
			'lcl_customs_service',
			'air_customs_service',
			'rail_domestic_freight_service',
		].includes(service_type) &&
		selectedRate.source === 'flash_booking'
	) {
		const { data } = selectedRate || {};
		const rate = data[0] || {};
		return {
			primary_service,
			id: selectedRate.id,
			[primary_service.id]: {
				service_provider_id: rate.service_provider_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
								code: item.code,
								name: item.name,
								price: item.price,
								currency: item.currency,
								unit: item.unit,
								quantity:
									primary_service?.trucks_count ||
									primary_service.containers_count ||
									primary_service.quantity ||
									1,
						  }))
						: undefined,
			},
		};
	}
	return {};
};

export default formatRates;
