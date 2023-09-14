const getExpertiseCardColumns = ({ t = () => {} }) => [
	{
		key   : 'high_priority_count',
		label : t('allocation:high_priority_count'),
		flex  : 2.5,
	},
	{
		key   : 'parameters',
		label : t('allocation:no_of_parameters'),
		flex  : 2,
	},

];

export default getExpertiseCardColumns;
