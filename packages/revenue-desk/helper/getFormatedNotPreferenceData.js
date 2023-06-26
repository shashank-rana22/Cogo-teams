const getFormatedNotPreferenceData = ({ ratesDataNotPrefered, singleServiceData }) => {
	const container_count = singleServiceData?.containers_count || 1;
	const rows = [];
	(ratesDataNotPrefered || [])?.forEach((element) => {
		const row = {};
		const rowData = {};
		let allocation_ratio = null;
		if (element?.allocation_amount !== null){
			allocation_ratio = element?.allocated_amount/element?.allocation_amount;
		}
		row.id = element?.rate_id;
		rowData.service_provider = element?.service_provider;
		rowData.air_line = element?.data?.[0]?.airline?.business_name;
		rowData.shipping_line =	element?.data?.[0]?.shipping_line?.business_name;
		rowData.total_buy_price = element?.price || 0;
		rowData.total_buy_currency = element?.currency || '';
		rowData.fulfillment_ratio_2 = element?.fulfillment_data?.fulfillment_ratio_2;
		rowData.fulfillment_ratio_7 = element?.fulfillment_data?.fulfillment_ratio_7;
		rowData.fulfillment_ratio_30 = element?.fulfillment_data?.fulfillment_ratio_30;
		rowData.allocation_ratio = allocation_ratio || 0;
		rowData.sell_price_per_container = Number(element?.buy_price) / Number(container_count);
		rowData.sell_price_currency = element?.buy_price_currency;
		rowData.active_booking = element?.active_bookings || 0;
		rowData.profit = element?.profit || 0;
		rowData.profit_percentage = element?.profit_percent || 0;
		rowData.source = element?.source || undefined;
		rowData.api = 'showed_rates';
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};
export default getFormatedNotPreferenceData;
