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

};

module.exports = referral;
