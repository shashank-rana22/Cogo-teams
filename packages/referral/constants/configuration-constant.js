const NETWORK_LEVEL = 39;
const LOWEST_NETWORK_LEVEL = 2;

export const OVERALL_LIMIT = [
	{ label: '%', value: 'percentage' },
	{ label: 'Fixed', value: 'fixed' },
	{ label: 'None', value: 'none' },
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
	const options = [...Array(NETWORK_LEVEL).keys()].map((i) => {
		const label = `N-${i + LOWEST_NETWORK_LEVEL}`;
		const value = Number(`-${i + LOWEST_NETWORK_LEVEL}`);
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
