import global from '../../constants/global';

const getFormatedRates = (type, data) => {
	const rows = [];
	const getRateAndCurrency = (line_items) => {
		let currency = null;
		let rate = null;
		let is_rate_expired = null;
		let schedule_type = null;
		(line_items || []).forEach((row) => {
			if (global.FLASH_BOOKING_CHARGE_CODES.includes(row.code)) {
				rate = row?.price;
				currency = row?.currency;
				is_rate_expired = rate?.is_rate_expired;
				schedule_type = rate?.schedule_type;
			}
		});
		return {
			currency,
			rate,
			is_rate_expired,
			schedule_type,
		};
	};

	if (type === 'present' || type === 'current') {
		(data || []).forEach((element) => {
			const {
				rate, currency, is_rate_expired, schedule_type,
			} =				getRateAndCurrency(element?.line_items);
			const row = {};
			const rowData = {};

			row.id = element?.id;
			rowData.shipping_line =	element?.reverted_shipping_line?.business_name
				|| element?.shipping_line?.business_name;
			rowData.service_provider = element?.service_provider?.business_name;
			rowData.buy_price = rate;
			rowData.currency = currency;
			rowData.is_rate_expired = is_rate_expired;
			rowData.via_route = element?.destination_main_port?.name;
			rowData.schedule_type = schedule_type;
			rowData.allocation_ratio = '_ _ _';
			rowData.fullfillment_ratio = '_ _ _';
			rowData.reliability_ratio = '_ _ _';
			row.rowData = rowData;
			rows.push(row);
		});
	}
	return { rows };
};

export default getFormatedRates;
