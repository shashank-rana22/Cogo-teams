const getSystemFormatedRates = (data) => {
	const getMinRate = (rates) => {
		let minimumRate = null;
		let currency = null;
		let is_rate_expired = null;
		let schedule_type = null;
		if (rates?.length) {
			let min = rates[0]?.price;
			currency = rates[0]?.currency;
			is_rate_expired = rates[0]?.is_rate_expired;
			schedule_type = rates[0]?.schedule_type;
			rates.forEach((rate) => {
				if (rate?.price < min) {
					min = rate?.price;
					currency = rate?.currency;
					is_rate_expired = rate?.is_rate_expired;
					schedule_type = rate?.schedule_type;
				}
			});
			minimumRate = min;
		}
		return {
			minimumRate,
			currency,
			is_rate_expired,
			schedule_type,
		};
	};

	const rows = [];
	(data || []).forEach((element) => {
		const {
			minimumRate, currency, is_rate_expired, schedule_type,
		} =			getMinRate(element?.line_items || element?.validities);
		const row = {};
		const rowData = {};
		row.id = element?.id;
		rowData.shipping_line = element?.shipping_line?.business_name;
		rowData.service_provider = element?.service_provider?.business_name;
		rowData.buy_price = minimumRate;
		rowData.currency = currency;
		rowData.is_rate_expired = is_rate_expired;
		rowData.schedule_type = schedule_type;
		rowData.allocation_ratio = '_ _ _';
		rowData.fullfillment_ratio = '_ _ _';
		rowData.reliability_ratio = '_ _ _';
		row.rowData = rowData;
		rowData.via_route = element?.destination_main_port?.name;
		rows.push(row);
	});
	return { rows };
};

export default getSystemFormatedRates;
