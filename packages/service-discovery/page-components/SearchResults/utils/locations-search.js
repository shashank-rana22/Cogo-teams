import { getByKey } from '@cogoport/utils';

const isSingleLocation = (search_type) => {
	const onlySingleLocation = [
		'fcl_customs',
		'lcl_customs',
		'air_customs',
		'origin_fcl_customs',
		'destination_fcl_customs',
		'origin_lcl_customs',
		'destination_lcl_customs',
		'origin_air_customs',
		'destination_air_customs',
		'fcl_cfs',
		'fcl_freight_local',
		'lcl_freight_local',
		'air_freight_local',
		'rail_domestic_freight',
	];
	return onlySingleLocation.includes(search_type);
};

const getLocationDetails = (data, type, service_key) => {
	const service_type = data[service_key] || data.service_type;

	const SUFFIX_MAPPING = {
		lcl_freight                 : 'port',
		fcl_freight                 : 'port',
		air_freight                 : 'airport',
		trailer_freight             : 'location',
		ftl_freight                 : 'location',
		ltl_freight                 : 'location',
		fcl_customs                 : 'port',
		lcl_customs                 : 'location',
		air_customs                 : 'airport',
		haulage_freight             : 'location',
		origin_trailer_freight      : 'location',
		destination_trailer_freight : 'location',
		origin_ftl_freight          : 'location',
		destination_ftl_freight     : 'location',
		origin_ltl_freight          : 'location',
		destination_ltl_freight     : 'location',
		origin_fcl_customs          : 'port',
		destination_fcl_customs     : 'port',
		origin_lcl_customs          : 'location',
		destination_lcl_customs     : 'location',
		origin_air_customs          : 'airport',
		destination_air_customs     : 'airport',
		fcl_cfs                     : 'port',
		fcl_freight_local           : 'port',
		lcl_freight_local           : 'port',
		air_freight_local           : 'airport',
		rail_domestic_freight       : 'location',
	};

	const suffix = SUFFIX_MAPPING[service_type];
	const objName = !isSingleLocation(service_type)
		? `${type}_${suffix}`
		: suffix;

	return data[objName];
};

const getLocationInfo = (
	data,
	keys = {
		origin           : null,
		origin_main      : null,
		destination      : null,
		destination_main : null,
	},
	service_key = 'primary_service',
) => {
	if (keys?.destination || keys?.origin) {
		const origin = getByKey(data, keys?.origin) || getByKey(data, keys?.alternateOrigin);

		const origin_main = getByKey(data, keys?.origin_main);

		const destination = getByKey(data, keys?.destination)
			|| getByKey(data, keys?.alternateDestination);

		const destination_main = getByKey(data, keys?.destination_main);

		return {
			origin,
			destination,
			origin_main,
			destination_main,
		};
	}

	if (service_key) {
		const origin = getLocationDetails(data, 'origin', service_key);
		const origin_main = getLocationDetails(data, 'origin_main', service_key);

		const destination = !isSingleLocation(data[service_key])
			? getLocationDetails(data, 'destination', service_key)
			: null;

		const destination_main = !isSingleLocation(data[service_key])
			? getLocationDetails(data, 'destination_main', service_key)
			: null;

		return {
			origin,
			origin_main,
			destination,
			destination_main,
		};
	}

	return {
		origin           : null,
		origin_main      : null,
		destination      : null,
		destination_main : null,
	};
};

export default getLocationInfo;
