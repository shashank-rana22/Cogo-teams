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
				price_type                        : element?.data?.price_type,
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
				fulfillment_ratio_2               : element?.fulfillment_ratio_2,
				fulfillment_ratio_7               : element?.fulfillment_ratio_7,
				fulfillment_ratio_30              : element?.fulfillment_ratio_30,
				total_price_in_preferred_currency : validities?.total_price_in_preferred_currency,
				preferred_currency                : validities?.preferred_currency,
				remarks                           : element?.remarks,
				shipment_id                       : element?.shipment_id,
				preferred_shipping_line_id        : element?.shipping_line_id,
				expiration_time                   : element?.expiration_time,
				platform                          : element?.platform,
				origin_locals_price               : element?.origin_locals?.total_price,
				origin_locals_currency            : element?.origin_locals?.currency,
				destination_locals_price          : element?.destination_locals?.total_price,
				destination_locals_currency       : element?.destination_locals?.currency,
				updated_at                        : element?.updated_at,
				total_price_currency              : validities.currency,
				validity_id                       : validities?.id,
			};
			// rowData.shipping_line = element?.reverted_shipping_line?.business_name
			// 	|| element?.shipping_line?.business_name
			// 	|| element?.shipping_line?.short_name;
			// rowData.air_line = element?.reverted_airline?.business_name
			// 	|| element?.airline?.business_name;
			// rowData.price_type = element?.data?.price_type;
			// rowData.container_count = container_count;
			// rowData.service_provider = element?.service_provider;
			// rowData.price = Number(validities?.total_price) / Number(container_count);
			// rowData.total_price = validities?.total_price || DEFAULT_VALUE;
			// rowData.currency = validities?.currency;
			// rowData.profit = validities?.profit || DEFAULT_VALUE;
			// rowData.profit_percentage = validities?.profit_percentage || DEFAULT_VALUE;
			// rowData.active_booking = element?.ongoing_shipment;
			// rowData.service_provider_id = element?.service_provider_id || element?.service_provider?.id;
			// rowData.via_route = element?.destination_main_port?.name;
			// rowData.allocation_ratio = undefined;
			// rowData.fulfillment_ratio_2 = element?.fulfillment_ratio_2;
			// rowData.fulfillment_ratio_7 = element?.fulfillment_ratio_7;
			// rowData.fulfillment_ratio_30 = element?.fulfillment_ratio_30;
			// rowData.total_price_in_preferred_currency = validities?.total_price_in_preferred_currency;
			// rowData.preferred_currency = validities?.preferred_currency;
			// rowData.remarks = element?.remarks;
			// rowData.shipment_id = element?.shipment_id;
			// rowData.preferred_shipping_line_id = element?.shipping_line_id;
			// rowData.expiration_time = element?.expiration_time;
			// rowData.platform = element?.platform;
			// rowData.origin_locals_price = element?.origin_locals?.total_price;
			// rowData.origin_locals_currency = element?.origin_locals?.currency;
			// rowData.destination_locals_price = element?.destination_locals?.total_price;
			// rowData.destination_locals_currency = element?.destination_locals?.currency;
			// rowData.updated_at = element?.updated_at;
			// rowData.total_price = validities.total_price;
			// rowData.total_price_currency = validities.currency;
			// rowData.validity_id = validities?.id;
			row.rowData = rowData;
			ROWS.push(row);
		});
	}
	return { rows: ROWS };
};

export default getFormatedRates;
