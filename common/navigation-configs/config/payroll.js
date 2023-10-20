const payroll = {
	'/[partner_id]/payroll': {
		layoutType : 'no_header',
		navigation : 'payroll',
		isMainNav  : true,
	},
	'/[partner_id]/payroll/[tab]': {
		layoutType : 'no_header',
		navigation : 'payroll',
	},
	'/[partner_id]/calculator': {
		layoutType : 'no_header',
		navigation : 'payroll-calculator',
		isMainNav  : true,
	},

};

module.exports = payroll;
