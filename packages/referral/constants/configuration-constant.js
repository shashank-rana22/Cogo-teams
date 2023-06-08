const DEFAULT_ARRAY_VALUE= 39;
const INDEX_VALUE = 2;

export const OVERALL_LIMIT = [
	{ label: '%', value: 'percentage' },
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'None', value: 'none' },
];

export const SHIPMENT_TYPE = [
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

export const INCENTIVE_OPTIONS = [
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'None', value: 'none' },
];

export const TOTAL_INCENTIVE = [
	{ label: '%', value: 'percentage' },
	{ label: 'None', value: 'none' },
];

export const BONUS_TYPE = [
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'Slab', value: 'slab' },
];

const getNodeOptions = () => {
	const options = [...Array(DEFAULT_ARRAY_VALUE).keys()].map((i) => {
		const label = `N-${i + INDEX_VALUE}`;
		const value = Number(`-${i + INDEX_VALUE}`);
		return { label, value };
	});

	return options;
};

export const NODE_OPTIONS = [...getNodeOptions(), { label: 'Master Node', value: 'master_node' }];

export const NETWORK_BONUS_CRITERIA = [
	{ label: 'None', value: 0 },
	{ label: '1 Transacting User', value: 1 },
	{ label: '2 Transacting User', value: 2 },
	{ label: '3 Transacting User', value: 3 },
	{ label: '4 Transacting User', value: 4 },
];
