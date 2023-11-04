const cogoStore = {
	'/[partner_id]/cogo-store': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : true,
	},
	'/[partner_id]/cogo-store/[product_id]': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-store/my-cart': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-store/order-details': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-store/order-history': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
	'/[partner_id]/cogo-store/admin-view': {
		layoutType : 'no_header',
		navigation : 'cogo_store',
		isMainNav  : false,
	},
};

module.exports = cogoStore;
