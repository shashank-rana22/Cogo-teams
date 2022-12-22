const isSingleLocation = (search_type) => {
	const onlySingleLocation = [
		'fcl_customs',
		'lcl_customs',
		'origin_fcl_customs',
		'destination_fcl_customs',
		'origin_lcl_customs',
		'destination_lcl_customs',
		'fcl_freight_local',
		'lcl_freight_local',
	];

	return onlySingleLocation.includes(search_type);
};

export default isSingleLocation;
