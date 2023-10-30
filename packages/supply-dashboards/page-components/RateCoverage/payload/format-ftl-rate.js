import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const TOTAL_HOURS = 24;
const formatFtlRate = (data, user_id) => {
	const LINE_ITEMS = [];
	const basicFreightObject = {
		code     : 'BAS',
		unit     : 'per_truck',
		currency : data?.currency || 'INR',
		price    : data?.price_per_truck || 0,
		remarks  : [data.remarks],
	};
	LINE_ITEMS.push(basicFreightObject);

	const fuelSurchargeObject = {
		code     : 'FSC',
		unit     : data?.fuel_surcharge_type || 0,
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		price    : data?.fuel_surcharge_value || 0,
	};

	LINE_ITEMS.push(fuelSurchargeObject);

	const formattedValues = {
		origin_location_id      : data.origin_location_id,
		destination_location_id : data.destination_location_id,
		service_provider_id     : data.service_provider_id,
		sourced_by_id           : data?.sourced_by_id,
		procured_by_id          : data?.procured_by_id || user_id,
		truck_type              : data.truck_type,
		truck_body_type         : data.body_type,
		trip_type               : 'one_way',
		validity_start          : data?.validity_start,
		validity_end            : data?.validity_end,
		line_items              : LINE_ITEMS || [],
	};

	const { commodity } = data;
	if (commodity !== 'all_commodity') {
		formattedValues.commodity = commodity;
	}

	const { transit_time_type } = data;
	let { transit_time } = data;
	if (transit_time_type === 'days') {
		transit_time *= TOTAL_HOURS;
	}

	formattedValues.transit_time = transit_time;

	const detention_time_type = data?.detention_free_time_type;
	let detention_time_value = Number(
		data.detention_free_time,
	);
	if (detention_time_type === 'days') {
		detention_time_value *= TOTAL_HOURS;
	}
	formattedValues.detention_free_time = detention_time_value;

	return formattedValues;
};

export default formatFtlRate;
