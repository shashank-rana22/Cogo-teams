export const getLevelsConfig = (t = () => {}) => ({
	fields: [
		{
			label : t('incidentManagement:levels_label'),
			key   : 'levels',
			span  : 2,
		},
		{
			label : t('incidentManagement:user_label'),
			key   : 'user',
			span  : 4,
		},
		{
			label : t('incidentManagement:criteria_label'),
			key   : 'criteria',
			span  : 4,
		},
		{
			label : '',
			key   : 'edit',
			span  : 2,
		},
	],
});
