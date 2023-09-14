const getWarmthAccountStats = ({ t = () => {} }) => [
	{
		key   : 'ice_cold_accounts',
		label : t('allocation:ice_cold'),
		flex  : 1,
	},
	{
		key   : 'cold_accounts',
		label : t('allocation:cold'),
		flex  : 1,
	},
];

export default getWarmthAccountStats;
