const formatRates = (selectedRate, shipment_data, service_type_prop, primaryService, serviceList) => {
	if (!selectedRate) {
		return {};
	}
	const service_type =		service_type_prop || 'fcl_freight_service';

	const origin_local = (serviceList || []).find(
		(service) => service.service_type === 'fcl_freight_local_service'
			&& service.trade_type === 'export',
	);
	const destination_local = (serviceList || []).find(
		(service) => service.service_type === 'fcl_freight_local_service'
			&& service.trade_type === 'export',
	);

	if (service_type === 'fcl_freight_service') {
		const { data } = selectedRate || {};
		const rate = data?.[0] || {};

		return {
			id                  : selectedRate.id,
			primaryService,
			origin_local,
			destination_local,
			[primaryService.id] : {
				service_provider_id : rate.service_provider_id,
				shipping_line_id    : rate.shipping_line_id,
				line_items:
					rate && rate?.line_items
						? rate.line_items?.map((item) => ({
							code     : item.code,
							name     : item.name,
							currency : item.currency,
							price    : item.price,
							unit     : item.unit,
							quantity : item.quantity,
						}))
						: undefined,
			},
		};
	}
	if (
		[
			'ftl_freight_service',
			'fcl_customs_service',
		].includes(service_type)
		&& selectedRate.source === 'flash_booking'
	) {
		const { data } = selectedRate || {};
		const rate = data[0] || {};
		return {
			primaryService,
			id                  : selectedRate.id,
			[primaryService.id] : {
				service_provider_id: rate.service_provider_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							price    : item.price,
							currency : item.currency,
							unit     : item.unit,
							quantity:
              primaryService?.trucks_count
									|| primaryService.containers_count
									|| primaryService.quantity
									|| 1,
						}))
						: undefined,
			},
		};
	}
	return {};
};

export default formatRates;
