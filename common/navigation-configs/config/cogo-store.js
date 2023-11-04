const cogoStore = {
	'/[partner_id]/cogo-merch': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : true,
	},
	'/[partner_id]/cogo-merch/[product_id]': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-merch/my-cart': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-merch/order-details': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-merch/order-history': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-merch/admin-view': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
};

module.exports = cogoStore;
