const getFormatedNotPreferenceData = ({ ratesDataNotPrefered, singleServiceData }) => {
	const container_count = singleServiceData?.containers_count || 1;
	const rows = [];
	(ratesDataNotPrefered || [])?.forEach((element) => {
		const row = {};
		const rowData = {};
		let allocation_ratio = null;
		if (element?.allocation_amount !== null) {
			allocation_ratio = Number(element?.allocated_amount) / Number(element?.allocation_amount);
		}
		row.id = element?.rate_id;
		rowData.service_provider = element?.service_provider;
		rowData.air_line = element?.data?.[0]?.airline?.business_name;
		rowData.shipping_line =	element?.data?.[0]?.shipping_line?.business_name;
		rowData.total_price = element?.validities?.[0]?.total_price || 0;
		rowData.currency = element?.validities?.[0]?.currency || '';
		rowData.fulfillment_ratio_2 = element?.fulfillment_data?.fulfillment_ratio_2;
		rowData.fulfillment_ratio_7 = element?.fulfillment_data?.fulfillment_ratio_7;
		rowData.fulfillment_ratio_30 = element?.fulfillment_data?.fulfillment_ratio_30;
		rowData.allocation_ratio = allocation_ratio || 0;
		rowData.sell_price_per_container = Number(element?.validities?.[0]?.total_price)
		/ Number(container_count);
		rowData.sell_price_currency = element?.validities?.[0]?.currency;
		rowData.active_booking = element?.data?.active_bookings || 0;
		rowData.profit = element?.validities?.[0]?.profit || 0;
		rowData.profit_percentage = element?.validities?.[0]?.profit_percentage || 0;
		rowData.source = element?.source || undefined;
		rowData.api = 'showed_rates';
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};
export default getFormatedNotPreferenceData;
