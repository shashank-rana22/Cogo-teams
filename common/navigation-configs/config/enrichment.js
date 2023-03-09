const enrichment = {
	'/[partner_id]/enrichment': {
		navigation : 'enrichment',
		isMainNav  : true,
	},

	'/[partner_id]/enrichment/[id]': {
		navigation : 'enrichment',
		isMainNav  : false,
		layoutType : 'no_header',
	},
};

module.exports = enrichment;
