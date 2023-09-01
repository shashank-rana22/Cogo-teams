const getLifeCyleStageOptions = ({ t = () => {} }) => ([
	{
		label : t('allocation:transacting_objective'),
		name  : 'transacting',
		value : 'transacting',
	},
	{
		label : t('allocation:organic_leads_objective'),
		name  : 'organic_leads',
		value : 'organic_leads',
	},
]);

export default getLifeCyleStageOptions;
