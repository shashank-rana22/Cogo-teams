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
			air_line                 : element?.airline?.business_name,
			shipping_line            : element?.shipping_line?.business_name,
			total_price              : validities?.total_price || DEFAULT_VALUE,
			currency                 : validities?.currency || '',
			agent                    : element?.procured_by?.name,
			fulfillment_ratio_2      : element?.fulfillment_data?.day_2 || data?.day_2,
			fulfillment_ratio_7      : element?.fulfillment_data?.day_7 || data?.day_7,
			fulfillment_ratio_15     : element?.fulfillment_data?.day_15 || data?.day_15,
			fulfillment_ratio_30     : element?.fulfillment_data?.day_30 || data?.day_30,
			sell_price_currency      : validities?.currency,
			sell_price_per_container : Number(validities?.total_price) / Number(container_count),
			active_booking           : element?.data?.active_bookings || DEFAULT_VALUE,
			profit                   : validities?.profit || data?.profit || DEFAULT_VALUE,
			profit_percentage        : validities?.profit_percentage
			|| data?.profit_percentage || DEFAULT_VALUE,
			line_items                        : validities?.line_items,
			origin_locals                     : element?.origin_locals || {},
			origin_locals_price               : element?.origin_locals?.total_price,
			origin_locals_currency            : element?.origin_locals?.currency,
			destination_locals                : element?.destination_locals || {},
			destination_locals_price          : element?.destination_locals?.total_price,
			destination_locals_currency       : element?.destination_locals?.currency,
			source                            : element?.source || undefined,
			api                               : 'showed_rates',
			total_price_in_preferred_currency : validities?.total_price_in_preferred_currency,
			preferred_currency                : validities?.preferred_currency,
			updated_at                        : element?.updated_at,
			validity_end                      : element?.validity_end || validities?.validity_end,
			schedule_type                     : validities?.schedule_type,
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
