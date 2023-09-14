const getData = ({ t = () => {} }) => [
	{
		warmth: 'ice_cold', count: 0, label: t('allocation:ice_cold'),
	},
	{
		warmth: 'cold', count: 0, label: t('allocation:cold'),
	},
	{
		warmth: 'warm', count: 0, label: t('allocation:warm'),
	},
	{
		warmth: 'hot', count: 0, label: t('allocation:hot'),
	},
	{
		warmth: 'flaming_hot', count: 0, label: t('allocation:flaming_hot'),
	},
];

export default getData;
