export const getTabs = ({ t = () => {} }) => [
	{
		key   : 'requested',
		label : t('incidentManagement:requested_tab'),
	},
	{
		key   : 'approved',
		label : t('incidentManagement:approved_tab'),
	},
	{
		key   : 'rejected',
		label : t('incidentManagement:rejected_tab'),
	},
	{
		key   : 'controller',
		label : t('incidentManagement:approval_management_tab'),
	},
];
