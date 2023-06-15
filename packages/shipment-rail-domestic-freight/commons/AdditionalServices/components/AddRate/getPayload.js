const getPayload = (data = {}, item = {}, preProps = {}, filters = {}, billToCustomer = null) => {
	const addedService = (item.services || []).find((service) => {
		if (filters?.service_type?.includes('?')) {
			return service.id === filters?.service_type?.split('?')?.[1];
		}
		return service.service_type === item?.service_type;
	});

	const { name, code, shipment_id, service_type, pending_task_id } = item;
	const {
		quantity, buy_price, currency, unit, service_provider_id, alias, price, container_number,
	} = data;

	const payload = preProps.api === '/create_shipment_additional_service'
		? {
			name,
			code,
			shipment_id,
			service_type,
			service_id            : addedService?.id,
			is_rate_available     : true,
			quantity              : Number(quantity) || undefined,
			buy_price             : Number(buy_price) || undefined,
			currency,
			unit,
			price                 : Number(price) || undefined,
			service_provider_id   : service_provider_id || undefined,
			pending_task_id       : pending_task_id || undefined,
			add_to_sell_quotation : null,
			alias                 : alias || undefined,
			state                 : preProps.state,
			container_number      : container_number || undefined,
		}
		: {
			id                    : item.id,
			quantity              : Number(data.quantity) || undefined,
			price                 : Number(data.price) || undefined,
			buy_price             : Number(data.buy_price) || undefined,
			currency              : currency || undefined,
			state                 : preProps.state,
			service_provider_id   : service_provider_id || undefined,
			pending_task_id       : item.pending_task_id || undefined,
			add_to_sell_quotation : billToCustomer,
			alias                 : alias || undefined,
			container_number      : container_number || undefined,
		};

	return payload;
};

export default getPayload;