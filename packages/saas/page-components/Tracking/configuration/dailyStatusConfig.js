const getDailyStatusConfig = ({ t }) => [
	{
		key   : 'name',
		title : t('airOceanTracking:tracking_daily_status_config_label_1'),
		func  : 'renderName',
		width : '20%',
	},
	{
		key   : 'schedule',
		title : t('airOceanTracking:tracking_daily_status_config_label_1'),
		func  : 'renderEdit',
		width : '35%',
	},
	{
		key   : 'shipments',
		title : t('airOceanTracking:tracking_daily_status_config_label_2'),
		func  : 'renderEdit',
		width : '15%',
	},
	{
		key   : 'report_update',
		title : t('airOceanTracking:tracking_daily_status_config_label_3'),
		func  : 'renderDate',
		width : '15%',
	},
	{
		key   : 'status',
		title : t('airOceanTracking:tracking_daily_status_config_label_4'),
		func  : 'renderStatus',
		width : '10%',
	},
];

export default getDailyStatusConfig;
