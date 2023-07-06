export const getUnit = (item) => {
	let label = [];

	label = {
		fcl_freight : 'container',
		lcl_freight : 'volume',
		air_freight : 'weight',
	};

	return label?.[item] || '';
};

export const getServiceUnit = (item) => {
	let label = [];

	label = {
		fcl_freight : 'CTR',
		lcl_freight : 'CBM',
		air_freight : 'KGS',
	};

	return label?.[item] || '';
};
