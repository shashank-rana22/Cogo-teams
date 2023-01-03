const isSingleLocation = (search_type) => {
	const onlySingleLocation = [
		'fcl_customs',
		'origin_fcl_customs',
		'destination_fcl_customs',
		'fcl_freight_local',
	];

	return onlySingleLocation.includes(search_type);
};

export default isSingleLocation;
