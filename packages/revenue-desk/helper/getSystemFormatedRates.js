const getSystemFormatedRates = (data, singleServiceData) => {
	const container_count = singleServiceData?.containers_count || 1;
	const rows = [];

	(data || []).forEach((element) => {
		const row = {};
		const rowData = {};
		row.id = element?.id;
		rowData.shipping_line =	element?.shipping_line?.business_name
			|| element?.shipping_line?.short_name;
		rowData.air_line = element?.airline?.business_name;
		rowData.service_provider = element?.service_provider;
		rowData.service_provider_id = element?.service_provider_id;
		rowData.price_type = element?.price_type;
		rowData.container_count = container_count;
		rowData.active_booking = element?.ongoing_shipment;
		rowData.allocation_ratio = undefined;
		rowData.price = Number(element?.validities?.[0]?.total_price) / Number(container_count);
		rowData.fulfillment_ratio_2 = element?.fulfillment_ratio_2;
		rowData.fulfillment_ratio_7 = element?.fulfillment_ratio_7;
		rowData.fulfillment_ratio_15 = element?.fulfillment_ratio_15;
		rowData.total_price = element?.validities?.[0]?.total_price || 0;
		rowData.currency = element?.validities?.[0]?.currency;
		rowData.total_price_in_preferred_currency = element?.validities?.[0]?.total_price_in_preferred_currency;
		rowData.preferred_currency = element?.validities?.[0]?.preferred_currency;
		rowData.profit = element?.validities?.[0]?.profit || 0;
		rowData.schedule_type = element?.validities?.[0]?.schedule_type;
		rowData.agent = element?.procured_by?.name;
		rowData.profit_percentage = element?.validities?.[0]?.profit_percentage;
		rowData.validity_end = element?.validity_end || element?.validities?.[0]?.validity_end;
		rowData.origin_locals_price = element?.origin_locals?.total_price;
		rowData.origin_locals_currency = element?.origin_locals?.total_price_currency;
		rowData.destination_locals_price = element?.destination_locals?.total_price;
		rowData.destination_locals_currency = element?.destination_locals?.total_price_currency;
		rowData.origin_main_port_id = element?.origin_main_port_id && element?.origin_main_port_id !== 'None'
			? element?.origin_main_port_id
			: null;
		rowData.updated_at = element?.updated_at;
		rowData.destination_main_port_id = element?.destination_main_port_id
			&& element?.destination_main_port_id !== 'None'
			? element?.destination_main_port_id
			: null;
		rowData.mode = element?.mode;
		rowData.via_route = element?.destination_main_port?.name;
		rowData.total_price = element?.validities?.[0].total_price;
		rowData.total_price_currency = element?.validities?.[0].currency;
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};

export default getSystemFormatedRates;
