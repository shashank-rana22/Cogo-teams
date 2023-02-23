const enrichment = {
	'[partner_id]/enrichment': {
		navigation : 'enrichment',
		isMainNav  : true,
	},

	'[partner_id]/enrichment/[organization_id]': {
		navigation : 'enrichment',
		isMainNav  : false,
	},
};

module.exports = enrichment;
