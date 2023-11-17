import { format } from '@cogoport/utils';

const TOTAL_HOURS = 24;
const formatLtlRate = (data, user_id) => {
	const formattedValues = {
		currency                  : data?.currency,
		origin_location_type      : data?.origin?.origin_type,
		origin_location_id        : data?.origin_location_id,
		minimum_freight_charge    : data?.minimum_freight_charge || undefined,
		minimum_chargeable_weight : data?.minimum_chargeable_weight || undefined,
		transit_time              : data?.transit_time || undefined,
		unit                      : data?.unit,
		destination_location_type : data?.destination?.destination_type,
		destination_location_id   : data?.destination_location_id,
		service_provider_id       : data.service_provider_id,
		sourced_by_id             : data.sourced_by_id,
		procured_by_id            : data.procured_by_id || user_id,
		weight_slabs              : (data?.weight_slabs || []).map((item) => ({
			lower_limit : item?.lower_limit,
			upper_limit : item?.upper_limit,
			price       : item?.price_per_unit || item?.price,
			currency    : data?.currency,
		})),
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

	formattedValues.validity_start = format(data?.date_range?.startDate);
	formattedValues.validity_end = format(data?.date_range?.endDate);

	return formattedValues;
};

export default formatLtlRate;
