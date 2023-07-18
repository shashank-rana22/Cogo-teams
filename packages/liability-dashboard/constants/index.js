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

export const USER_TYPE_MAPPING = {
	channel_partner: {
		name  : 'CP',
		color : '#c4dc91',
	},
	importer_exporter: {
		name  : 'IE',
		color : '#fef199',
	},
	affiliate: {
		name  : 'Affiliate',
		color : '#f8aea8',
	},
};

export const ADD_ONE_DAY = 1;

export const TRANSACTION_TYPE = {
	liability_point_value               : 'credit',
	total_burnt_point_value             : 'debit',
	shipment_burnt_point_value          : 'debit',
	saas_subscription_burnt_point_value : 'debit',
	cogostore_burnt_point_value         : 'debit',
};

export const NAME_STATS_OPTIONS = ['liability_point_value',
	'total_burnt_point_value',
	'shipment_burnt_point_value',
	'saas_subscription_burnt_point_value',
	'cogostore_burnt_point_value'];

export const NAME_TAB_OPTIONS = ['overall', 'importer_exporter', 'channel_partner', 'affiliate'];

export const ORGANISATION_STATS_OPTION = ['liability_point_value',
	'total_burnt_point_value',
	'shipment_burnt_point_value',
	'saas_subscription_burnt_point_value',
	'cogostore_burnt_point_value'];

export const ORGANISATION_TAB_OPTION = ['overall', 'importer_exporter', 'channel_partner'];

export const USER_TYPE_STATS_OPTIONS = ['liability_point_value',
	'total_burnt_point_value',
	'shipment_burnt_point_value',
	'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value',
];

export const USER_TYPE_TAB_OPTIONS = ['overall', 'importer_exporter', 'channel_partner', 'affiliate'];

export const TOTAL_STATS_OPTIONS = ['liability_point_value',
	'total_burnt_point_value',
	'shipment_burnt_point_value',
	'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value',
];

export const TOTAL_TAB_OPTIONS = ['overall', 'importer_exporter', 'channel_partner', 'affiliate'];

export const SHIPMENT_STATS_OPTIONS = ['liability_point_value',
	'total_burnt_point_value',
	'shipment_burnt_point_value'];

export const SUBSCRIPTION_STAT_OPTIONS = ['liability_point_value',
	'total_burnt_point_value',
	'saas_subscription_burnt_point_value'];

export const REFERRAL_STATS_OPTIONS = ['liability_point_value'];

export const REFERRAL_TAB_OPTIONS = ['overall', 'importer_exporter', 'channel_partner', 'affiliate'];

export const ONE_TIME_STATS_OPTIONS = ['liability_point_value'];

export const COMMON_TAB_OPTIONS = ['overall', 'importer_exporter', 'channel_partner'];

export const COGOSTORE_STATS_OPTIONS = ['total_burnt_point_value',
	'cogostore_burnt_point_value'];

export const COGOSTORE_TAB_OPTIOINS = ['overall', 'importer_exporter', 'channel_partner', 'affiliate'];

export const ACTIVE_CARD_MAPPING = ({ liabilityData, burntData }) => ({
	liability_point_value   : liabilityData,
	total_burnt_point_value : burntData,
});

export const LINE_CHART_TITLE_MAPPING = {
	liability_point_value               : 'Liability Creation Trend',
	total_burnt_point_value             : 'Cogopoint burnt trend',
	shipment_burnt_point_value          : 'Cogopoint burnt trend',
	saas_subscription_burnt_point_value : 'Cogopoint burnt trend',
	cogostore_burnt_point_value         : 'Cogopoint burnt trend',
};
