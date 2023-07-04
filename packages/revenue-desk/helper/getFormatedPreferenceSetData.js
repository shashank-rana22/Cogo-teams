import { DEFAULT_INDEX, DEFAULT_VALUE } from '../page-components/constants';

const getFormatedPreferenceSetData = ({ allPreferenceCardsData }) => {
	const ROWS = [];
	(allPreferenceCardsData || []).forEach((element) => {
		const data = element?.data?.[DEFAULT_INDEX];
		const validities = data?.validities?.[DEFAULT_INDEX];

		const row = {
			id: element?.buy_rate_preferences?.rate_id || element?.rate_id,
		};
		const rowData = {
			service_provider         : data?.service_provider,
			air_line                 : data?.airline?.business_name,
			shipping_line            :	data?.shipping_line?.business_name,
			total_price              : validities?.total_price || DEFAULT_VALUE,
			currency                 : validities?.currency || '',
			fulfillment_ratio_2      : data?.fulfillment_data?.fulfillment_ratio_2,
			fulfillment_ratio_7      : data?.fulfillment_data?.fulfillment_ratio_7,
			fulfillment_ratio_30     : data?.fulfillment_data?.fulfillment_ratio_30,
			active_booking           : data?.active_bookings || DEFAULT_VALUE,
			priority                 : element?.priority,
			sell_price_per_container : element?.sell_rate_preferences?.basic_freight_rate || DEFAULT_VALUE,
			sell_price_currency      : element?.sell_rate_preferences?.currency,
			profit                   : validities?.profit || DEFAULT_VALUE,
			profit_percentage        : validities?.profit_percentage || DEFAULT_VALUE,
			source                   : element?.source || undefined,
			selected_priority        : element?.selected_priority,
			api                      : 'booking_preference',
		};

		let allocation_ratio = null;
		if (data?.allocation_amount !== null) {
			allocation_ratio = Number(data?.allocated_amount)
			/ Number(data?.allocation_amount);
		}
		rowData.allocation_ratio = allocation_ratio || DEFAULT_VALUE;

		// row.id = element?.buy_rate_preferences?.rate_id || element?.rate_id;

		// rowData.service_provider = data?.service_provider;
		// rowData.air_line = data?.airline?.business_name;
		// rowData.shipping_line =	data?.shipping_line?.business_name;
		// rowData.total_price = validities?.total_price || DEFAULT_VALUE;
		// rowData.currency = validities?.currency || '';
		// rowData.fulfillment_ratio_2 = data?.fulfillment_data?.fulfillment_ratio_2;
		// rowData.fulfillment_ratio_7 = data?.fulfillment_data?.fulfillment_ratio_7;
		// rowData.fulfillment_ratio_30 = data?.fulfillment_data?.fulfillment_ratio_30;
		// rowData.active_booking = data?.active_bookings || DEFAULT_VALUE;
		// rowData.priority = element?.priority;
		// rowData.sell_price_per_container = element?.sell_rate_preferences?.basic_freight_rate || DEFAULT_VALUE;
		// rowData.sell_price_currency = element?.sell_rate_preferences?.currency;
		// rowData.profit = validities?.profit || DEFAULT_VALUE;
		// rowData.profit_percentage = validities?.profit_percentage || DEFAULT_VALUE;
		// rowData.source = element?.source || undefined;
		// rowData.selected_priority = element?.selected_priority;
		// rowData.api = 'booking_preference';
		row.rowData = rowData;
		ROWS.push(row);
	});
	return { rows: ROWS };
};
export default getFormatedPreferenceSetData;
