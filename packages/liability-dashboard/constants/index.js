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
		label  : 'Cogopoint Liability',
		name   : 'liability_point_value',
		type   : 'cp_liability',
		access : ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
	},
	{
		label  : 'Cogopoint Burnt',
		name   : 'total_burnt_point_value',
		type   : 'cp_burnt',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt (Shipments)',
		name   : 'shipment_burnt_point_value',
		type   : 'shipment',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt (Subscriptions)',
		name   : 'saas_subscription_burnt_point_value',
		type   : 'subscription',
		access : ['overall', 'importer_exporter', 'channel_partner'],
	},
	{
		label  : 'Burnt (Cogostore)',
		name   : 'cogostore_burnt_point_value',
		type   : 'cogostore',
		access : ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
	},
];

export const PIE_CHART_CHECK = ['liability_point_value', 'total_burnt_point_value', 'affiliate'];

export const EVENT_MAPPING = {
	shipment_burnt_point_value          : 'shipment',
	saas_subscription_burnt_point_value : 'saas_subscription',
	cogostore_burnt_point_value         : 'cogostore',
};

export const USER_TYPE_COLOR_MAPPING = {
	channel_partner   : '#c4dc91',
	importer_exporter : '#fef199',
	affiliate         : '#f8aea8',
};

export const USER_TYPE_MAPPING = {
	channel_partner   : 'CP',
	importer_exporter : 'IE',
	affiliate         : 'Affiliate',
};

export const ACTIVE_CARD_MAPPING = ({ liabilityData, burntData }) => ({
	liability_point_value   : liabilityData,
	total_burnt_point_value : burntData,
});
