const getSelectOperatorOptions = ({ t }) => ([
	{
		name  : 'and',
		value : 'and',
		label : (
			<p>
				{t('allocation:operator_options_consider_both_requirements_together')}
				{' '}
				<b>{t('allocation:operator_options_and')}</b>
				{' '}
				{t('allocation:operator_options_options')}
				{t('allocation:operator_options_confirming_to_both_the_requirements')}
			</p>
		),
	},
	{
		name  : 'or',
		value : 'or',
		label : (
			<p>
				{t('allocation:operator_options_or_as')}
				{' '}
				<b>{t('allocation:operator_options_or')}</b>
				{' '}
				{t('allocation:operator_options_in_the_case')}
				{t('allocation:operator_options_confirming_mentioned_requirements')}
			</p>
		),
	},
]);

export default getSelectOperatorOptions;
