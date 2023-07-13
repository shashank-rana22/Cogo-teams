import isSingleLocation from './isSingleLocation';

const getLocationDetails = (primaryService, type) => {
	const { service_type } = primaryService || {};
	const SUFFIX_CONFIG = {
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
	};

	const suffix = SUFFIX_CONFIG[service_type];

	const objName = !isSingleLocation(service_type)
		? `${type}_${suffix}`
		: suffix;

	const location = (primaryService[objName] || {}).display_name || '';

	const port_code = (primaryService[objName] || {}).port_code
		|| (primaryService[objName] || {}).postal_code
		|| null;

	const country = ((primaryService[objName] || {}).country || {}).name || '';

	const mainLocation = (primaryService[`${type}_main_${suffix}`] || {}).name;

	return { name: mainLocation || location, port_code, country };
};

export default getLocationDetails;
