export const options = (isEditable:boolean, t) => [
	{
		label    : t('incidentManagement:approve_btn'),
		value    : 'true',
		name     : '',
		disabled : !isEditable,
	},
	{
		label    : t('incidentManagement:reject_btn'),
		value    : 'false',
		name     : '',
		disabled : !isEditable,
	}];

export const optionsManual = (isEditable:boolean, t) => [
	{ label: t('incidentManagement:penny_testing'), value: 'PENNY', name: '', disabled: !isEditable },
	{ label: t('incidentManagement:manual_verification'), value: 'MANUAL', name: '', disabled: !isEditable },
];
