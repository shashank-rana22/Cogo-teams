const getDurationOptions = ({ t = () => {} }) => [
	{ label: t('allocation:one_day'), value: 1 },
	{ label: t('allocation:last_seven_days'), value: 7 },
	{ label: t('allocation:last_fourteen_days'), value: 14 },
	{ label: t('allocation:last_thirty_days'), value: 30 },
	{ label: t('allocation:last_sixty_days'), value: 60 },
	{ label: t('allocation:custom_days'), value: 'custom' },
];

export default getDurationOptions;
