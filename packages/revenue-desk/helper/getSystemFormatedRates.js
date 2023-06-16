const getSystemFormatedRates = (data, singleServiceData) => {
	const getMinRate = (rates) => {
		let minimumRate = null;
		let currency = null;
		let is_rate_expired = null;
		let schedule_type = null;
		let validity_end = null;
		let unit=null;
		if (rates?.length) {
			let min = rates[0]?.price;
			currency = rates[0]?.currency;
			is_rate_expired = rates[0]?.is_rate_expired;
			schedule_type = rates[0]?.schedule_type;
			validity_end = rates[0]?.validity_end;
			unit=rates[0]?.unit;
			rates.forEach((rate) => {
				if (rate?.price < min) {
					min = rate?.price;
					currency = rate?.currency;
					is_rate_expired = rate?.is_rate_expired;
					schedule_type = rate?.schedule_type;
					validity_end = rate?.validity_end;
					unit=rate?.unit;
				}
			});
			minimumRate = min;
		}
		return {
			minimumRate,
			currency,
			is_rate_expired,
			schedule_type,
			validity_end,
			unit
		};
	};
	const rows = [];
	(data || []).forEach((element) => {
		const {
			minimumRate,
			currency,
			is_rate_expired,
			schedule_type,
			validity_end,
			unit
		} = getMinRate(element?.line_items || element?.validities);

		const chargeable_weight = singleServiceData?.chargeable_weight;
		const { completed_shipments = 0, cancelled_shipments = 0 } = element;
		const row = {};
		const rowData = {};
		row.id = element?.id;
		rowData.shipping_line =	element?.shipping_line?.business_name
			|| element?.shipping_line?.short_name;
		rowData.air_line = element?.airline?.business_name;
		rowData.service_provider = element?.service_provider;
		rowData.buy_price = minimumRate;
		rowData.currency = currency;
		rowData.price_type = element?.price_type;
		rowData.chargeable_weight = chargeable_weight;
		rowData.container_count = singleServiceData?.containers_count;
		rowData.is_rate_expired = is_rate_expired;
		rowData.schedule_type = schedule_type;
		rowData.unit=unit;
		rowData.active_booking = element?.ongoing_shipment;
		rowData.allocation_ratio = undefined;
		rowData.fulfillment_ratio = Number(completed_shipments) + Number(cancelled_shipments) !== 0
			? Number(completed_shipments)
			/ (Number(completed_shipments) + Number(cancelled_shipments)) : 0;
		rowData.total_buy_price = element?.total_price || 0;
		rowData.total_buy_currency=element?.total_price_currency;
		rowData.validity_end = validity_end || element?.validity_end;
		rowData.origin_locals_price = element?.origin_locals?.total_price;
		rowData.origin_locals_currency = element?.origin_locals?.total_price_currency;
		rowData.destination_locals_price = element?.destination_locals?.total_price;
		rowData.destination_locals_currency = element?.destination_locals?.total_price_currency;
		rowData.origin_main_port_id =element?.origin_main_port_id && element?.origin_main_port_id !== 'None'
			? element?.origin_main_port_id
			: null;
		rowData.destination_main_port_id =			element?.destination_main_port_id
			&& element?.destination_main_port_id !== 'None'
			? element?.destination_main_port_id
			: null;
		row.rowData = rowData;
		rowData.via_route = element?.destination_main_port?.name;
		rows.push(row);
	});
	return { rows };
};

export default getSystemFormatedRates;
