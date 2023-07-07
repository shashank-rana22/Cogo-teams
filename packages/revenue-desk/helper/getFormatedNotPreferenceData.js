import { DEFAULT_CONTAINER_COUNT, DEFAULT_INDEX, DEFAULT_VALUE } from '../page-components/constants';

const getFormatedNotPreferenceData = ({ ratesDataNotPrefered, singleServiceData }) => {
	const container_count = singleServiceData?.containers_count || DEFAULT_CONTAINER_COUNT;
	const ROWS = [];
	(ratesDataNotPrefered || [])?.forEach((element) => {
		const data = element?.data?.[DEFAULT_INDEX];
		const validities = element?.validities?.[DEFAULT_INDEX];

		const row = {
			id: element?.rate_id,
		};
		const rowData = {
			service_provider         : element?.service_provider,
			air_line                 : data?.airline?.business_name,
			shipping_line            :	data?.shipping_line?.business_name,
			total_price              : validities?.total_price || DEFAULT_VALUE,
			currency                 : validities?.currency || '',
			fulfillment_ratio_2      : element?.fulfillment_data?.day_2 || data?.fulfillment_ratio_2,
			fulfillment_ratio_7      : element?.fulfillment_data?.day_7 || data?.fulfillment_ratio_7,
			fulfillment_ratio_15     : element?.fulfillment_data?.day_15 || data?.fulfillment_ratio_15,
			fulfillment_ratio_30     : element?.fulfillment_data?.day_30 || data?.fulfillment_ratio_30,
			sell_price_currency      : validities?.currency,
			sell_price_per_container : Number(validities?.total_price) / Number(container_count),
			active_booking           : element?.data?.active_bookings || DEFAULT_VALUE,
			profit                   : validities?.profit || DEFAULT_VALUE,
			profit_percentage        : validities?.profit_percentage || DEFAULT_VALUE,
			line_items               : validities?.line_items,
			origin_locals            : element?.origin_locals,
			destination_locals       : element?.destination_locals,
			source                   : element?.source || undefined,
			api                      : 'showed_rates',
		};

		let allocation_ratio = null;
		if (element?.allocation_amount !== null) {
			allocation_ratio = Number(element?.allocated_amount) / Number(element?.allocation_amount);
		}
		rowData.allocation_ratio = allocation_ratio || DEFAULT_VALUE;
		row.rowData = rowData;
		ROWS.push(row);
	});
	return { rows: ROWS };
};
export default getFormatedNotPreferenceData;
