export const getOptions = ({ isEditable = false, t = () => {} }) => [
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
