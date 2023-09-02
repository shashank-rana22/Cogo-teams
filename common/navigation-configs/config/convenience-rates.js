const convenienceRates = {
	'/[partner_id]/convenience-rates': {
		layoutType : 'no_header',
		navigation : 'transaction_setting-convenience_rate',
		isMainNav  : true,
	},
	'/[partner_id]/convenience-rates/[convenience_rate_id]': {
		layoutType : 'no_header',
		navigation : 'transaction_setting-convenience_rate',
		isMainNav  : false,
	},
};

export default convenienceRates;
