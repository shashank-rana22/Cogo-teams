const handlingFees = {
	'/[partner_id]/handling-fees': {
		layoutType : 'no_header',
		navigation : 'transaction_setting-handling_fees',
		isMainNav  : true,
	},
	'/[partner_id]/handling-fees/create': {
		layoutType : 'no_header',
		navigation : 'transaction_setting-handling_fees',
		isMainNav  : false,
	},
	'/[partner_id]/handling-fees/edit/[id]': {
		layoutType : 'no_header',
		navigation : 'transaction_setting-handling_fees',
		isMainNav  : false,
	},
};

export default handlingFees;
