const serviceMappings = {
	OCEAN   : ['fcl_freight', 'lcl_freight', 'fcl_local_freight'],
	AIR     : ['air_freight'],
	SURFACE : ['rail_domestic_freight', 'ftl_freight', 'ltl_freight'],
};

export const getServiceMode = (primary_service) => {
	const serviceMode = Object.keys(serviceMappings).find((mode) => serviceMappings[mode].includes(primary_service));
	return serviceMode;
};
