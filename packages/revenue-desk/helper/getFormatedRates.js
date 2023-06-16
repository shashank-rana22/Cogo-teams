import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getFormatedRates = (type, data, singleServiceData) => {
	const rows = [];
	const getRateAndCurrency = (line_items) => {
		let currency = null;
		let rate = null;
		let is_rate_expired = null;
		let schedule_type = null;
		let unit=null;
		(line_items || []).forEach((row) => {
			if (GLOBAL_CONSTANTS.flash_booking_charge_codes.includes(row.code)) {
				rate = row?.price;
				currency = row?.currency;
				unit=row?.unit;
			}
		});
		return {
			currency,
			rate,
			is_rate_expired,
			schedule_type,
			unit
		};
	};

	if (type === 'present' || type === 'current') {
		(data || []).forEach((element) => {
			const { rate, currency,unit } = getRateAndCurrency(element?.line_items);
			const chargeable_weight = element?.data?.chargeable_weight
			|| element?.service?.chargeable_weight || singleServiceData?.chargeable_weight;
			const { completed_shipments = 0, cancelled_shipments = 0 } = element;
			const row = {};
			const rowData = {};
			row.id = element?.id;
			rowData.shipping_line = element?.reverted_shipping_line?.business_name
				|| element?.shipping_line?.business_name
				|| element?.shipping_line?.short_name;
			rowData.air_line =				element?.reverted_airline?.business_name
				|| element?.airline?.business_name;
			rowData.price_type = element?.data?.price_type;
			rowData.chargeable_weight = chargeable_weight;
			rowData.container_count = singleServiceData?.containers_count;
			rowData.service_provider = element?.service_provider?.business_name;
			rowData.buy_price = rate;
			rowData.total_buy_price = element?.reverted_total_buy_price || 0;
			rowData.total_buy_currency=element?.currency;
			rowData.active_booking = element?.ongoing_shipment;
			rowData.service_provider = element?.service_provider;
			rowData.currency = currency;
			rowData.via_route = element?.destination_main_port?.name;
			rowData.unit=unit;
			rowData.allocation_ratio = undefined;
			rowData.fulfillment_ratio = Number(completed_shipments) + Number(cancelled_shipments) !== 0
				? Number(completed_shipments)
			/ (Number(completed_shipments) + Number(cancelled_shipments)) : 0;
			rowData.remarks = element?.remarks;
			rowData.shipment_id = element?.shipment_id;
			rowData.preferred_shipping_line_id = element?.shipping_line_id;
			rowData.expiration_time = element?.expiration_time;
			rowData.platform = element?.platform;
			rowData.origin_locals_price = element?.origin_locals?.total_price;
			rowData.origin_locals_currency = element?.origin_locals?.total_price_currency;
			rowData.destination_locals_price = element?.destination_locals?.total_price;
			rowData.destination_locals_currency = element?.destination_locals?.total_price_currency;
			row.rowData = rowData;
			rows.push(row);
		});
	}
	return { rows };
};

export default getFormatedRates;
