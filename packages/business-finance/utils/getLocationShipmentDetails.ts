import isSingleLocation from './isSingleLocation';

const getLocationShipmentDetails = (data, summary, type) => {
	const { search_type:searchType } = summary;

	const suffixConfig = {
		fcl_freight             : 'port',
		lcl_freight             : 'port',
		air_freight             : 'airport',
		domestic_air_freight    : 'airport',
		origin_ftl_freight      : 'pickup',
		destination_ftl_freight : 'drop',
		origin_ltl_freight      : 'pickup',
		destination_ltl_freight : 'drop',
		haulage_freight         : 'location',
		fcl_customs             : 'port',
		lcl_customs             : 'location',
		air_customs             : 'airport',

		trailer_freight   : 'location',
		fcl_cfs           : 'port',
		fcl_freight_local : 'port',
		air_freight_local : 'airport',
		lcl_freight_local : 'port',
	};

	const suffix =		suffixConfig[`${type}_${searchType}`] || suffixConfig[searchType];

	const objName =		!isSingleLocation(searchType)
		&& !['ftl_freight', 'ltl_freight'].includes(searchType)
		? `${type}_${suffix}`
		: suffix;

	const location = (summary[objName] || {}).name || '';

	const portCode = (summary[objName] || {}).port_code
		|| (summary[objName] || {}).postal_code
		|| null;

	const country = ((summary[objName] || {}).country || {}).name || '';

	const { id } = summary[objName] || {};

	const displayName = (summary[objName] || {}).display_name || '';

	const mainLocation = (data[`${type}_main_${suffix}`] || {}).name;

	return {
		name: mainLocation || location,
		portCode,
		country,
		id,
		displayName,
	};
};

export default getLocationShipmentDetails;
