import { DEFAULT_CONTAINER_COUNT, DEFAULT_INDEX, DEFAULT_VALUE } from '../page-components/constants';

const getSystemFormatedRates = (data, singleServiceData) => {
	const container_count = singleServiceData?.containers_count || DEFAULT_CONTAINER_COUNT;
	const ROWS = [];

	(data || []).forEach((element) => {
		const validities = element?.validities?.[DEFAULT_INDEX];
		const row = {
			id: element?.id,
		};
		const rowData = {
			air_line                          : element?.airline?.business_name,
			service_provider                  : element?.service_provider,
			service_provider_id               : element?.service_provider_id,
			price_type                        : element?.price_type,
			container_count,
			active_booking                    : element?.ongoing_shipment,
			allocation_ratio                  : undefined,
			price                             : Number(validities?.total_price) / Number(container_count),
			fulfillment_ratio_2               : element?.fulfillment_ratio_2,
			fulfillment_ratio_7               : element?.fulfillment_ratio_7,
			fulfillment_ratio_15              : element?.fulfillment_ratio_15,
			agent                             : element?.procured_by?.name,
			total_price                       : validities?.total_price || DEFAULT_VALUE,
			currency                          : validities?.currency,
			total_price_in_preferred_currency : validities?.total_price_in_preferred_currency,
			preferred_currency                : validities?.preferred_currency,
			profit                            : validities?.profit || DEFAULT_VALUE,
			schedule_type                     : validities?.schedule_type,
			profit_percentage                 : validities?.profit_percentage,
			validity_id                       : validities?.id,
			validity_end                      : element?.validity_end || validities?.validity_end,
			origin_locals                     : element?.origin_locals || {},
			origin_locals_price               : element?.origin_locals?.total_price,
			origin_locals_currency            : element?.origin_locals?.total_price_currency,
			destination_locals                : element?.destination_locals || {},
			destination_locals_price          : element?.destination_locals?.total_price,
			destination_locals_currency       : element?.destination_locals?.total_price_currency,
			updated_at                        : element?.updated_at,
			mode                              : element?.mode,
			via_route                         : element?.destination_main_port?.name,
			total_price_currency              : validities?.currency,
			line_items                        : validities?.line_items,
			shipping_line                     :	element?.shipping_line?.business_name
												|| element?.shipping_line?.short_name,
			destination_main_port_id: element?.destination_main_port_id
												&& element?.destination_main_port_id !== 'None'
				? element?.destination_main_port_id : null,
			origin_main_port_id: element?.origin_main_port_id && element?.origin_main_port_id !== 'None'
				? element?.origin_main_port_id : null,
		};
		row.rowData = rowData;
		ROWS.push(row);
	});
	return { rows: ROWS };
};

export default getSystemFormatedRates;
