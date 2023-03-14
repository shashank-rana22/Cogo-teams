const testModule = {
	'/[partner_id]/test-module': {
		navigation : 'test_module',
		isMainNav  : true,
	},
	'/[partner_id]/test-module/create': {
		navigation : 'test_module',
		isMainNav  : false,
	},
};
module.exports = testModule;
