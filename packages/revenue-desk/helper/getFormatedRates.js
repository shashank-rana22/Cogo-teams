import { DEFAULT_CONTAINER_COUNT, DEFAULT_INDEX, DEFAULT_VALUE } from '../page-components/constants';

const getFormatedRates = (type, data, singleServiceData) => {
	const ROWS = [];
	const container_count = singleServiceData?.containers_count || DEFAULT_CONTAINER_COUNT;
	if (type === 'present' || type === 'current') {
		(data || []).forEach((element) => {
			const validities = element?.validities?.[DEFAULT_INDEX];
			const row = {
				id: element?.id,
			};
			const rowData = {
				shipping_line: element?.reverted_shipping_line?.business_name
								|| element?.shipping_line?.business_name || element?.shipping_line?.short_name,
				air_line: element?.reverted_airline?.business_name
							|| element?.airline?.business_name,
				price_type                        : validities?.price_type,
				is_minimum_price_rate             : validities?.is_minimum_price_rate,
				chargeable_weight                 : validities?.chargeable_weight,
				container_count,
				service_provider                  : element?.service_provider,
				price                             : Number(validities?.total_price) / Number(container_count),
				total_price                       : validities?.total_price || DEFAULT_VALUE,
				currency                          : validities?.currency,
				profit                            : validities?.profit || DEFAULT_VALUE,
				profit_percentage                 : validities?.profit_percentage || DEFAULT_VALUE,
				active_booking                    : element?.ongoing_shipment,
				service_provider_id               : element?.service_provider_id || element?.service_provider?.id,
				via_route                         : element?.destination_main_port?.name,
				allocation_ratio                  : undefined,
				total_price_in_preferred_currency : validities?.total_price_in_preferred_currency,
				preferred_currency                : validities?.preferred_currency,
				remarks                           : element?.remarks,
				shipment_id                       : element?.shipment_id,
				preferred_shipping_line_id        : element?.shipping_line_id,
				expiration_time                   : element?.expiration_time,
				platform                          : element?.platform,
				origin_locals                     : element?.origin_locals || {},
				origin_locals_price               : element?.origin_locals?.total_price,
				origin_locals_currency            : element?.origin_locals?.currency,
				destination_locals                : element?.destination_locals || {},
				destination_locals_price          : element?.destination_locals?.total_price,
				destination_locals_currency       : element?.destination_locals?.currency,
				updated_at                        : element?.updated_at,
				total_price_currency              : validities.currency,
				validity_id                       : validities?.id,
				line_items                        : validities?.line_items || [],
				fulfillment_ratio_2               : element?.fulfillment_data?.day_2 || element?.day_2,
				fulfillment_ratio_7               : element?.fulfillment_data?.day_7 || element?.day_7,
				fulfillment_ratio_15              : element?.fulfillment_data?.day_15 || element?.day_15,
				fulfillment_ratio_30              : element?.fulfillment_data?.day_30 || element?.day_30,
				shipment_type                     : element?.shipment_type,

			};
			row.rowData = rowData;
			ROWS.push(row);
		});
	}
	return { rows: ROWS };
};

export default getFormatedRates;
