const getFormatedPreferenceSetData = ({ allPreferenceCardsData }) => {
	const rows = [];
	(allPreferenceCardsData || []).forEach((element) => {
		const row = {};
		const rowData = {};
		row.id = element?.buy_rate_preferences?.rate_id || element?.rate_id;
		rowData.service_provider = element?.data?.[0]?.service_provider;
		rowData.air_line = element?.data?.[0]?.airline?.business_name;
		rowData.shipping_line =	element?.data?.[0]?.shipping_line?.business_name;
		rowData.total_buy_price = element?.buy_rate_preferences?.buy_price || 0;
		rowData.total_buy_currency = element?.buy_rate_preferences?.buy_price_currency || '';
		rowData.fulfillment_ratio = element?.buy_rate_preferences?.fulfillment_ratio || 0;
		rowData.allocation_ratio = element?.buy_rate_preferences?.allocation_ratio || 0;
		rowData.active_booking = element?.buy_rate_preferences?.active_bookings || 0;
		rowData.priority = element?.priority;
		rowData.sell_price_per_container = element?.sell_rate_preferences?.basic_freight_rate || 0;
		rowData.sell_price_currency = element?.sell_rate_preferences?.currency;
		rowData.source = element?.source || undefined;
		rowData.api = 'booking_preference';
		row.rowData = rowData;
		rows.push(row);
	});
	return { rows };
};
export default getFormatedPreferenceSetData;
