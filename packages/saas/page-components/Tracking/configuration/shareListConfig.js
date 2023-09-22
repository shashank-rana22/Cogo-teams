const getShareListConfig = ({ t }) => [
	{
		key   : 'name',
		title : t('airOceanTracking:tracking_share_list_config_label_1'),
		width : '30%',
	},
	{
		key   : 'email',
		title : t('airOceanTracking:tracking_share_list_config_label_2'),
		width : '35%',
	},
	{
		key   : 'created_at',
		title : t('airOceanTracking:tracking_share_list_config_label_3'),
		func  : 'renderDataTime',
		width : '35%',
	},
];

export default getShareListConfig;
