const referral = {
	'/[partner_id]/referral/dashboard': {
		layoutType : 'no_header',
		navigation : 'referral-referral_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/referral/dashboard/[referrer_id]': {
		layoutType : 'no_header',
		navigation : 'referral-referral_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/referral/configuration': {
		layoutType : 'no_header',
		navigation : 'referral-referral_configuration',
		isMainNav  : true,
	},

};

module.exports = referral;
