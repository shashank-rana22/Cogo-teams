const SUFFIXCONFIG = {
	fcl_freight             : 'port',
	lcl_freight             : 'port',
	air_freight             : 'airport',
	domestic_air_freight    : 'airport',
	rail_domestic_freight   : 'location',
	origin_ftl_freight      : 'pickup',
	destination_ftl_freight : 'drop',
	origin_ltl_freight      : 'pickup',
	destination_ltl_freight : 'drop',
	haulage_freight         : 'location',
	fcl_customs             : 'port',
	lcl_customs             : 'location',
	air_customs             : 'airport',
	trailer_freight         : 'location',
	fcl_cfs                 : 'port',
	fcl_freight_local       : 'port',
	air_freight_local       : 'airport',
	lcl_freight_local       : 'port',
};

export default function getShipmentLocation({ data = {}, type = 'origin' }) {
	const { shipment_type } = data;

	const suffix = SUFFIXCONFIG[`${type}_${shipment_type}`] || SUFFIXCONFIG[shipment_type];

	const objName = !['ftl_freight', 'ltl_freight'].includes(shipment_type)
		? `${type}_${suffix}`
		: suffix;

	const location = (data[objName] || {}).name || '';

	const port_code = (data[objName] || {}).port_code || (data[objName] || {}).postal_code || null;

	const country = ((data[objName] || {}).country || {}).name || '';

	const { id } = data[objName] || {};
	const display_name = (data[objName] || {}).display_name || '';
	const mainLocation = (data[`${type}_main_${suffix}`] || {}).name;

	return {
		name: mainLocation || location,
		port_code,
		country,
		id,
		display_name,
	};
}
