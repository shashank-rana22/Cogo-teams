import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

const TOTAL_HOURS = 24;
const formatLtlRate = (val) => {
	const formattedValues = {
		origin_location_type      : val?.origin?.origin_type,
		origin_location_id        : val?.origin?.origin_value,
		destination_location_type : val?.destination?.destination_type,
		destination_location_id   : val?.destination?.destination_value,
		service_provider_id       : val?.service_provider,
		procured_by_id            : val?.rate_procured,
		sourced_by_id             : val?.rate_provided,
		density_factor            : val?.density_factor,
	};
	const { commodity } = val;
	if (commodity !== 'all_commodity') {
		formattedValues.commodity = commodity;
	}

	const { transit_time_type } = val.transit_time;
	let { transit_time_value } = val.transit_time;
	if (transit_time_type === 'days') {
		transit_time_value *= TOTAL_HOURS;
	}
	formattedValues.transit_time = transit_time_value;

	const LINE_ITEMS = [];
	const basicFreightObject = {
		code     : 'BAS',
		unit     : 'per_kg',
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		price    : val.basic_freight_rate,
		remarks  : [],
	};
	LINE_ITEMS.push(basicFreightObject);

	const fuelSurchargeObject = {
		code     : 'FSC',
		unit     : val.fuel_surcharge.fuel_surcharge_type,
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		price    : val.fuel_surcharge.fuel_surcharge_value,
	};
	LINE_ITEMS.push(fuelSurchargeObject);

	const freightOnValueObject = {
		code     : 'FOV',
		unit     : val.freight_on_value.freight_on_value_type,
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		price    : val.freight_on_value.freight_on_value_value,
	};
	LINE_ITEMS.push(freightOnValueObject);

	formattedValues.line_items = LINE_ITEMS;
	formattedValues.validity_start = format(val.date_range.startDate);
	formattedValues.validity_end = format(val.date_range.endDate);

	return formattedValues;
};

export default formatLtlRate;
