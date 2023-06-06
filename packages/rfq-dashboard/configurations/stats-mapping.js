const stats = {
	promised_revenue: {
		key   : 'promised_revenue',
		label : 'Promised Revenue',
	},
	promised_profitability: {
		key   : 'promised_profitability',
		label : 'Promised Profitability',
	},
};

const extra_stats = {
	live_contracts: {
		key   : 'live_contracts',
		label : 'Live Contracts',
	},
	utilization: {
		key   : 'utilization',
		label : 'Utilization',
	},
};

export const statFn = ({ type = '' }) => ({
	...stats,
	[type]: extra_stats?.[type],
});
