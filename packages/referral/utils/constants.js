export const overallLimit = [
	{ label: '%', value: 'percentage' },
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'None', value: 'none' },
];

export const shipmentType = [
	{ value: 'fcl_freight', label: 'FCL' },
	{ value: 'lcl_freight', label: 'LCL' },
	{ value: 'air_freight', label: 'AIR' },
	{ value: 'trailer_freight', label: 'Container Transportation' },
	{ value: 'ftl_freight', label: 'FTL' },
	{ value: 'ltl_freight', label: 'LTL' },
	{ value: 'haulage_freight', label: 'Rail Haulage' },
	{ value: 'fcl_customs', label: 'FCL Customs' },
	{ value: 'lcl_customs', label: 'LCL Customs' },
	{ value: 'air_customs', label: 'AIR Customs' },
	{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
];

export const incentiveOptions = [
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'None', value: 'none' },
];

export const totalIncentive = [
	{ label: '%', value: 'percentage' },
	{ label: 'None', value: 'none' },
];

export const bonusType = [
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'Slab', value: 'slab' },
];

const getNodeOptions = () => {
	const options = [...Array(39).keys()].map((i) => {
		const label = `N-${i + 2}`;
		const value = Number(`-${i + 2}`);
		return { label, value };
	});

	return options;
};

export const nodeOptions = [...getNodeOptions(), { label: 'Master Node', value: 'master_node' }];

export const networkBonusCriteria = [
	{ label: 'None', value: 0 },
	{ label: '1 Transacting User', value: 1 },
	{ label: '2 Transacting User', value: 2 },
	{ label: '3 Transacting User', value: 3 },
	{ label: '4 Transacting User', value: 4 },
];
