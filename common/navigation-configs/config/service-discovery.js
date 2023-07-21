const serviceDiscovery = {
	'/[partner_id]/service_discovery': {
		navigation : 'service_discovery',
		isMainNav  : true,
	},
	'/[partner_id]/book/[spot_search_id]': {
		navigation: 'service_discovery',
	},
	'/[partner_id]/checkout/[checkout_id]': {
		navigation : 'service_discovery',
		isMainNav  : false,
	},
};
module.exports = serviceDiscovery;
