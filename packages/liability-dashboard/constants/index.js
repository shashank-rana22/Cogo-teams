export const HEADER_TAB_OPTIONS = [
	{
		title : 'Overall',
		name  : 'overall',
	},
	{
		title : 'IE Portal',
		name  : 'importer_exporter',
	},
	{
		title : 'CP Portal',
		name  : 'channel_partner',
	},
	{
		title : 'Affiliate Portal',
		name  : 'affiliate',
	},
];

export const STATS_CARDS = [
	{
		label  : 'CP Liability',
		name   : 'liability_point_value',
		access : ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
	},
	{
		label  : 'CP Burnt',
		name   : 'total_burnt_point_value',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt Thru Shipments',
		name   : 'shipment_burnt_point_value',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt Thru Subscriptions',
		name   : 'saas_subscription_burnt_point_value',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt Thru Cogostore',
		name   : 'cogostore_burnt_point_value',
		access : ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
	},
];
