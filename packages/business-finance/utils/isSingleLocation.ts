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
		'air_freight_local',
		'lcl_freight_local',
	];

	return onlySingleLocation.includes(search_type);
};

export default isSingleLocation;
