const DEFAULT_TRANSIT_TIME = 0;
const TOTAL_HOURS = 24;

const formatTrailerFreight = (val, user_id) => {
	const formattedValues = {
		origin_location_id      : val.origin_location_id,
		destination_location_id : val.destination_location_id,
		service_provider_id     : val.service_provider_id,
		sourced_by_id           : val.sourced_by_id,
		procured_by_id          : val.procured_by_id || user_id,
		trailer_type            : val.trailer_type,
		container_size          : val.container_size,
		container_type          : val.container_type,
		trip_type               : 'one_way',
		validity_start          : val?.validity_start,
		validity_end            : val?.validity_end,
	};

	const { commodity } = val;

	if (commodity !== 'all_commodity') {
		formattedValues.commodity = commodity;
	}

	const transit_time_type = val?.transit_time_type || 'days';
	let transit_time_value = val?.transit_time || DEFAULT_TRANSIT_TIME;
	transit_time_value = Number(transit_time_value);
	if (transit_time_type === 'days') {
		transit_time_value *= TOTAL_HOURS;
	}
	formattedValues.transit_time = transit_time_value;

	const detention_time_type = val.detention_free_time_type || 'days';
	let detention_time_value = Number(
		val.detention_free_time,
	);
	if (detention_time_type === 'days') {
		detention_time_value *= TOTAL_HOURS;
	}
	formattedValues.detention_free_time = detention_time_value;

	const LINE_ITEMS = [];
	const basicFreightObject = {
		code     : 'BAS',
		unit     : 'per_trailer',
		currency : val.currency,
		price    : val.price_per_trailer,
		remarks  : [val.remarks],
	};
	LINE_ITEMS.push(basicFreightObject);

	const fuelSurchargeObject = {
		code     : 'FSC',
		unit     : val.fuel_surcharge_type,
		currency : val.currency,
		price    : val.fuel_surcharge,
	};

	LINE_ITEMS.push(fuelSurchargeObject);
	formattedValues.line_items = LINE_ITEMS;
	formattedValues.transport_modes = ['trailer'];
	formattedValues.haulage_type = 'merchant';
	return formattedValues;
};
export default formatTrailerFreight;
