const getLegendItems = ({ t = () => {} }) => [
	{
		label : t('allocation:active_status'),
		color : '#abcd62',
		key   : 'active',
	},
	{
		label : t('allocation:publishable_status'),
		color : '#f68b21',
		key   : 'publishable',
	},
	{
		label : t('allocation:not_publishable_status'),
		color : '#ee3425',
		key   : 'not_publishable',
	},
	{
		label : t('allocation:draft_status'),
		color : '#ac55ac',
		key   : 'draft',
	},
	{
		label : t('allocation:checking_status'),
		color : '#bdbdbd',
		key   : 'checking',
	},
];

export default getLegendItems;
