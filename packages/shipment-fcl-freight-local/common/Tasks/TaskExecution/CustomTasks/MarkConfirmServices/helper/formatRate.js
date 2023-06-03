const formatRates = (selectedRate, service_type_prop, primaryService) => {
	if (!selectedRate) return {};

	const service_type = service_type_prop;

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
