const getFormatedPreferenceSetData = ({ allPreferenceCardsData }) => {
	const rows = [];
	(allPreferenceCardsData || []).forEach((element) => {
		const row = {};
		const rowData = {};
		let allocation_ratio = null;
		if (element?.data?.[0]?.allocation_amount !== null) {
			allocation_ratio = Number(element?.data?.[0]?.allocated_amount)
			/ Number(element?.data?.[0]?.allocation_amount);
		}
		row.id = element?.buy_rate_preferences?.rate_id || element?.rate_id;
		rowData.service_provider = element?.data?.[0]?.service_provider;
		rowData.air_line = element?.data?.[0]?.airline?.business_name;
		rowData.shipping_line =	element?.data?.[0]?.shipping_line?.business_name;
		rowData.total_price = element?.data?.[0]?.validities?.[0]?.total_price || 0;
		rowData.currency = element?.data?.[0]?.validities?.[0]?.currency || '';
		rowData.fulfillment_ratio_2 = element?.data?.[0]?.fulfillment_data?.fulfillment_ratio_2;
		rowData.fulfillment_ratio_7 = element?.data?.[0]?.fulfillment_data?.fulfillment_ratio_7;
		rowData.fulfillment_ratio_30 = element?.data?.[0]?.fulfillment_data?.fulfillment_ratio_30;
		rowData.allocation_ratio = allocation_ratio || 0;
		rowData.active_booking = element?.data?.[0]?.active_bookings || 0;
		rowData.priority = element?.priority;
		rowData.sell_price_per_container = element?.sell_rate_preferences?.basic_freight_rate || 0;
		rowData.sell_price_currency = element?.sell_rate_preferences?.currency;
		rowData.profit = element?.data?.[0]?.validities?.[0]?.profit || 0;
		rowData.profit_percentage = element?.data?.[0]?.validities?.[0]?.profit_percentage || 0;
		rowData.source = element?.source || undefined;
		rowData.selected_priority = element?.selected_priority;
		rowData.api = 'booking_preference';
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};
export default getFormatedPreferenceSetData;
