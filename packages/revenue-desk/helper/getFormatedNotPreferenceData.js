const getFormatedNotPreferenceData = ({ ratesDataNotPrefered, singleServiceData }) => {
	const container_count = singleServiceData?.containers_count || 1;
	const rows = [];
	(ratesDataNotPrefered || [])?.forEach((element) => {
		const row = {};
		const rowData = {};
		row.id = element?.rate_id;
		rowData.service_provider = element?.data?.[0]?.service_provider;
		rowData.air_line = element?.data?.[0]?.airline?.business_name;
		rowData.shipping_line =	element?.data?.[0]?.shipping_line?.business_name;
		rowData.total_buy_price = element?.buy_price || 0;
		rowData.total_buy_currency = element?.buy_price_currency || '';
		rowData.fulfillment_ratio = element?.fulfillment_ratio || 0;
		rowData.allocation_ratio = element?.allocation_ratio || 0;
		rowData.sell_price_per_container = Number(element?.buy_price) / Number(container_count);
		rowData.sell_price_currency = element?.buy_price_currency;
		rowData.active_booking = element?.active_bookings || 0;
		rowData.source = element?.source || undefined;
		rowData.api = 'showed_rates';
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};
export default getFormatedNotPreferenceData;
