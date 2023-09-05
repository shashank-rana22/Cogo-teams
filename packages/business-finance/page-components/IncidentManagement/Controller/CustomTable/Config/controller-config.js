export const getControllerConfig = (t = () => {}) => ({
	headerClass : 'border',
	fields      : [
		{
			label : t('incidentManagement:id_label'),
			key   : 'referenceId',
			span  : 1,
		},
		{
			label : t('incidentManagement:incident_type_label'),
			key   : 'incidentType',
			span  : 2,
		},
		{
			label : t('incidentManagement:incident_sub_type_label'),
			key   : 'incidentSubType',
			span  : 2,
		},
		{
			label : t('incidentManagement:entity_label'),
			key   : 'entityCode',
			span  : 0.5,
		},
		{
			label : t('incidentManagement:levels_label'),
			key   : 'levels',
			span  : 1,
		},
		{
			label : t('incidentManagement:users_label'),
			key   : 'users',
			span  : 3.5,
		},
		{
			label : '',
			key   : 'edit',
			span  : 2,
		},
	],
});
