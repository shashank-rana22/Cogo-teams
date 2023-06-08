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
	'/[partner_id]/referral/analytics': {
		layoutType : 'no_header',
		navigation : 'referral-referral_analytics',
		isMainNav  : true,
	},
	'/[partner_id]/referral/simulation': {
		layoutType : 'no_header',
		navigation : 'referral-simulation',
		isMainNav  : true,
	},
};

module.exports = referral;
