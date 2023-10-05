import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

const DEFAULT_TRANSIT_TIME = 0;
const TOTAL_HOURS = 24;

const formatTrailerFreight = (val, user_id) => {
	const formattedValues = {
		origin_location_id      : val.origin,
		destination_location_id : val.destination,
		service_provider_id     : val.service_provider,
		procured_by_id          : val.rate_procured || user_id,
		sourced_by_id           : val.rate_provided,
		trailer_type            : val.trailer_type,
		container_size          : val.container_size,
		container_type          : val.container_type,
		trip_type               : 'one_way',
	};

	const { commodity } = val;
	if (commodity !== 'all_commodity') {
		formattedValues.commodity = commodity;
	}

	const { transit_time_type } = val?.transit_time || 'days';
	let { transit_time_value } = val?.transit_time || DEFAULT_TRANSIT_TIME;
	transit_time_value = Number(transit_time_value);
	if (transit_time_type === 'days') {
		transit_time_value *= TOTAL_HOURS;
	}
	formattedValues.transit_time = transit_time_value;

	const detention_time_type = val.detention_free_time.detention_free_time_type;
	let detention_time_value = Number(
		val.detention_free_time.detention_free_time_value,
	);
	if (detention_time_type === 'days') {
		detention_time_value *= TOTAL_HOURS;
	}
	formattedValues.detention_free_time = detention_time_value;

	const LINE_ITEMS = [];
	const basicFreightObject = {
		code     : 'BAS',
		unit     : 'per_trailer',
		currency : val.price_per_trailer.price_per_trailer_type,
		price    : val.price_per_trailer.price_per_trailer_value,
		remarks  : [val.remarks],
	};
	LINE_ITEMS.push(basicFreightObject);

	const fuelSurchargeObject = {
		code     : 'FSC',
		unit     : val.fuel_surcharge.fuel_surcharge_type,
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		price    : val.fuel_surcharge.fuel_surcharge_value,
	};

	LINE_ITEMS.push(fuelSurchargeObject);
	formattedValues.line_items = LINE_ITEMS;
	formattedValues.validity_start = format(val.date_range.startDate);
	formattedValues.validity_end = format(val.date_range.endDate);
	formattedValues.transport_modes = ['trailer'];
	formattedValues.haulage_type = 'merchant';
	return formattedValues;
};
export default formatTrailerFreight;
