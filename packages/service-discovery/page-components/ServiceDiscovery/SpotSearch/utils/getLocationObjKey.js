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
const getLocationObjKey = (serviceType, locationType) => {
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

	const suffix = SUFFIX_MAPPING[serviceType];
	const objName = !isSingleLocation(serviceType) ? `${locationType}_${suffix}_id` : `${suffix}_id`;

	return objName;
};

export default getLocationObjKey;
