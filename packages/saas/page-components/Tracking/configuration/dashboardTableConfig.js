const dashboardTableConfig = ({ type, t }) => [
	{
		key   : type === 'ocean' ? 'search_value' : 'airway_bill_no',
		title : t('airOceanTracking:dashboard_table_config_label_1'),
		width : '30%',
	},
	{
		key   : 'route',
		title : t('airOceanTracking:dashboard_table_config_label_2'),
		func  : 'renderRoute',
		width : '30%',
	},
	{
		key   : 'current_status',
		title : t('airOceanTracking:dashboard_table_config_label_3'),
		func  : type === 'ocean' ? 'renderCurrentStatus' : 'renderCurrentStatusAir',
		width : '30%',
	},
	{
		key   : 'last_modified_at',
		title : t('airOceanTracking:dashboard_table_config_label_4'),
		func  : 'renderDate',
		width : '25%',
	},
	{
		key   : 'view_more',
		title : '',
		func  : 'renderViewMore',
		width : '15%',
	},
];

export default dashboardTableConfig;
