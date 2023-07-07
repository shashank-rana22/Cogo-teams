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
			shipping_line            : data?.shipping_line?.business_name,
			total_price              : validities?.total_price || data?.total_price || DEFAULT_VALUE,
			currency                 : validities?.currency || '',
			fulfillment_ratio_2      : data?.fulfillment_data?.day_2 || data?.fulfillment_ratio_2,
			fulfillment_ratio_7      : data?.fulfillment_data?.day_7 || data?.fulfillment_ratio_7,
			fulfillment_ratio_15     : data?.fulfillment_data?.day_15 || data?.fulfillment_ratio_15,
			fulfillment_ratio_30     : data?.fulfillment_data?.day_30 || data?.fulfillment_ratio_30,
			active_booking           : data?.active_bookings || DEFAULT_VALUE,
			priority                 : element?.priority,
			sell_price_per_container : element?.sell_rate_preferences?.basic_freight_rate || DEFAULT_VALUE,
			sell_price_currency      : element?.sell_rate_preferences?.currency,
			profit                   : validities?.profit || DEFAULT_VALUE || data?.profit,
			profit_percentage        : validities?.profit_percentage || DEFAULT_VALUE || data?.profit_percentage,
			line_items               : validities?.line_items || data?.line_items || [],
			origin_locals            : element?.origin_locals,
			destination_locals       : element?.destination_locals,
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
		row.rowData = rowData;
		ROWS.push(row);
	});
	return { rows: ROWS };
};
export default getFormatedPreferenceSetData;
