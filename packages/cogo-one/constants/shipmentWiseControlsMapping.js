const SHIPMENT_WISE_CONTROL_MAPPING = {
	get_api: [
		'fcl_freight',
		'lcl_freight',
	],
	list_api: [
		'fcl_freight_local',
		'lcl_freight_local',
		'air_freight',
		'domestic_air_freight',
		'air_freight_local',
		'ltl_freight',
		'trailer_freight',
		'haulage_freight',
		'fcl_customs',
		'lcl_customs',
		'rail_domestic_freight',
		'air_customs',
	],
};

export const getControlType = ({ shipmentType = '' }) => Object.keys(SHIPMENT_WISE_CONTROL_MAPPING).find(
	(eachKey) => SHIPMENT_WISE_CONTROL_MAPPING[eachKey].includes(shipmentType),
);
