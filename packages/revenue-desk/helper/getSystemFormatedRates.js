const getSystemFormatedRates = (data, singleServiceData) => {
	const getMinRate = (rates) => {
		let minimumRate = null;
		let currency = null;
		let is_rate_expired = null;
		let schedule_type = null;
		let validity_end = null;
		if (rates?.length) {
			let min = rates[0]?.price;
			currency = rates[0]?.currency;
			is_rate_expired = rates[0]?.is_rate_expired;
			schedule_type = rates[0]?.schedule_type;
			validity_end = rates[0]?.validity_end;
			rates.forEach((rate) => {
				if (rate?.price < min) {
					min = rate?.price;
					currency = rate?.currency;
					is_rate_expired = rate?.is_rate_expired;
					schedule_type = rate?.schedule_type;
					validity_end = rate?.validity_end;
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
		};
	};
	const getMinRateForAir = (rates, chargeable_weight) => {
		let minRate = null;
		let currencyForAir = null;
		if (rates?.length) {
			minRate = rates[0]?.tariff_price;
			currencyForAir = rates[0]?.currency;
			rates.forEach((rate) => {
				if (chargeable_weight >= rate?.lower_limit) {
					minRate = rate?.tariff_price;
					currencyForAir = rate?.currency;
				}
			});
		}
		return {
			minRate,
			currencyForAir,
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
		} = getMinRate(element?.line_items || element?.validities);

		const chargeable_weight = element?.data?.chargeable_weight
		|| element?.service?.chargeable_weight || singleServiceData?.chargeable_weight;
		const { minRate, currencyForAir } = getMinRateForAir(element?.weight_slabs, chargeable_weight);
		let total_buy_price = 0;
		if (singleServiceData?.shipment_type === 'air_freight') {
			total_buy_price = Math.max(Number(minRate)
			* Number(chargeable_weight), element?.min_price);
		} else if (singleServiceData?.shipment_type === 'fcl_freight') {
			total_buy_price = Number(singleServiceData?.containers_count) * Number(minimumRate);
		}
		const { completed_shipments = 0, cancelled_shipments = 0 } = element;
		const row = {};
		const rowData = {};
		row.id = element?.id;
		rowData.shipping_line =	element?.shipping_line?.business_name
			|| element?.shipping_line?.short_name;
		rowData.air_line = element?.airline?.business_name;
		rowData.service_provider = element?.service_provider;
		rowData.buy_price = minimumRate || minRate;
		rowData.currency = currency || currencyForAir;
		rowData.price_type = element?.price_type;
		rowData.chargeable_weight = chargeable_weight;
		rowData.container_count = singleServiceData?.containers_count;
		rowData.is_rate_expired = is_rate_expired;
		rowData.schedule_type = schedule_type;
		rowData.active_booking = element?.ongoing_shipment;
		rowData.service_provider = element?.service_provider;
		rowData.allocation_ratio = '_ _ _';
		rowData.fullfillment_ratio = Number(completed_shipments) + Number(cancelled_shipments) !== 0
			? Number(completed_shipments)
			/ (Number(completed_shipments) + Number(cancelled_shipments)) : 0;
		rowData.reliability_ratio = '_ _ _';
		rowData.total_buy_price = total_buy_price || 0;
		rowData.validity_end = validity_end || element?.validity_end;
		rowData.origin_main_port_id =			element?.origin_main_port_id && element?.origin_main_port_id !== 'None'
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
