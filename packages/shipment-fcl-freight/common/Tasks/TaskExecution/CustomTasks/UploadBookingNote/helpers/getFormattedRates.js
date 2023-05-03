const getFormattedRates = ({
	selectedRate,
	shipment_data,
	primary_service:primaryService,
	servicesList,
}) => {
	if (!selectedRate?.id) {
		return {};
	}
	const service_type = primaryService?.service_type || `${shipment_data.shipment_type}_service`;

	const primary_service = (servicesList || []).find(
		(service) => service.service_type === service_type,
	);

	const origin_local = (servicesList || []).find(
		(service) => service.service_type === `${shipment_data.shipment_type}_local_service`
			&& service.trade_type === 'export',
	);

	const destination_local = (servicesList || []).find(
		(service) => service.service_type === `${shipment_data.shipment_type}_local_service`
			&& service.trade_type === 'export',
	);

	const { data } = selectedRate || {};
	const rate = data?.[0] || {};

	return {
		id                   : selectedRate.id,
		primary_service,
		origin_local,
		destination_local,
		[primary_service.id] : {
			service_provider_id : rate.service_provider_id,
			shipping_line_id    : rate.shipping_line_id,
			line_items          : rate && rate?.line_items
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
};

export default getFormattedRates;
