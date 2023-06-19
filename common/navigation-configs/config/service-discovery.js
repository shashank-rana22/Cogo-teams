const serviceDiscovery = {
	'/[partner_id]/service_discovery': {
		navigation : 'service_discovery',
		isMainNav  : true,
	},
	'/[partner_id]/book/[spot_search_id]/[importer_exporter_id]': {
		navigation: 'service_discovery',
	},
};
module.exports = serviceDiscovery;
