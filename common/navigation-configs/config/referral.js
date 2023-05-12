const referral = {
	'/[partner_id]/referral/dashboard': {
		layoutType : 'no_header',
		navigation : 'referral-dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/referral/dashboard/[referrer_id]': {
		layoutType : 'no_header',
		navigation : 'referral-dashboard',
	},
	'/[partner_id]/referral/analytics': {
		layoutType : 'no_header',
		navigation : 'referral-analytics',
		isMainNav  : true,
	},
	'/[partner_id]/referral/configuration': {
		layoutType : 'no_header',
		navigation : 'referral-configuration',
		isMainNav  : true,
	},
	'/[partner_id]/referral/affiliate-management': {
		layoutType : 'no_header',
		navigation : 'referral-affiliate_management',
		isMainNav  : true,
	},

};

module.exports = referral;
