const governanceManager = {
	'/[partner_id]/governance-manager': {
		layoutType : 'no_header',
		navigation : 'governance_manager',
		isMainNav  : true,
	},
	'/[partner_id]/governance-manager/[id]': {
		layoutType : 'no_header',
		navigation : 'governance_manager',
		isMainNav  : false,
	},
};
module.exports = governanceManager;
