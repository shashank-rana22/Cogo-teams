import getConfigs from '../configurations/get-configs';

const isSingleLocation = (search_type) => {
	const onlySingleLocation = [
		'fcl_customs',
		'origin_fcl_customs',
		'destination_fcl_customs',
		'fcl_freight_local',
	];

	return onlySingleLocation.includes(search_type);
};
const getLocationShipmentDetails = (data, summary, type) => {
	const { search_type } = summary;

	const suffixConfig = {
		fcl_freight       : 'port',
		fcl_customs       : 'port',
		fcl_freight_local : 'port',
	};

	const suffix =		suffixConfig[`${type}_${search_type}`] || suffixConfig[search_type];

	const objName =		!isSingleLocation(search_type)
		&& !['ftl_freight', 'ltl_freight'].includes(search_type)
		? `${type}_${suffix}`
		: suffix;

	const location = (summary[objName] || {}).name || '';

	const port_code =		(summary[objName] || {}).port_code
		|| (summary[objName] || {}).postal_code
		|| null;

	const country = ((summary[objName] || {}).country || {}).name || '';

	const { id } = summary[objName] || {};

	const display_name = (summary[objName] || {}).display_name || '';

	const mainLocation = (data[`${type}_main_${suffix}`] || {}).name;

	return {
		name: mainLocation || location,
		port_code,
		country,
		id,
		display_name,
	};
};

const getPortConfigs = (data = {}) => {
	if (data.search_type) {
		const origin = getLocationShipmentDetails({}, data, 'origin');

		const destination = !isSingleLocation(data.search_type)
			? getLocationShipmentDetails({}, data, 'destination')
			: null;

		return { origin, destination };
	}

	if (data.service_type) {
		const { service_type } = data;
		const { routeInfo } = getConfigs(data.service_type) || {};

		const isSingleShipmentLocation =			(service_type || '').includes('customs')
			|| (service_type || '').includes('cfs')
			|| (service_type || '').includes('fcl_freight_local');

		const origin = data[routeInfo.origin_pickup] || data[routeInfo.origin_port];
		const destination =			data[routeInfo.destination_drop] || data[routeInfo.destination_port];

		return { origin, destination, isSingleShipmentLocation };
	}
	return {};
};

export default getPortConfigs;
