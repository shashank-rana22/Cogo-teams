const getConfigurationOptions = ({ t = () => {} }) => [
	{
		label : t('allocation:old_label'),
		value : 'old_configuration',
	},
	{
		label : t('allocation:new_label'),
		value : 'new_configuration',
	},
];

export default getConfigurationOptions;
