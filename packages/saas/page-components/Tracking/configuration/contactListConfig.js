const getContactListConfig = ({ t }) => [
	{
		key   : 'name',
		title : t('airOceanTracking:tracking_add_contact_control_label_1'),
		width : '35%',
	},
	{
		key   : 'email',
		title : t('airOceanTracking:tracking_contact_list_config_label'),
	},
];

export default getContactListConfig;
