const cogoAcademy = {
	'/[partner_id]/learning/faq/create': {
		navigation : 'cogo_academy-create_faq',
		isMainNav  : true,
	},
	'/[partner_id]/learning/faq/create/configuration': {
		navigation: 'cogo_academy-create_faq',
	},
	'/[partner_id]/learning/faq/create/upload': {
		navigation : 'cogo_academy-create_faq',
		isMainNav  : false,
	},
	'/[partner_id]/learning/faq/create/question': {
		navigation : 'cogo_academy-create_faq',
		isMainNav  : false,
	},
	'/[partner_id]/learning/test-module': {
		navigation: 'cogo_academy-create_faq',
	},
	'/[partner_id]/learning/test-module/create-question': {
		navigation: 'cogo_academy-create_faq',
	},
	'/[partner_id]/learning/test-module/create-test': {
		navigation: 'cogo_academy-create_faq',
	},
	'/[partner_id]/learning/faq': {
		navigation : 'cogo_academy-faq',
		isMainNav  : true,
	},
	'/[partner_id]/learning/faq/answer': {
		navigation: 'cogo_academy-faq',
	},
	'/[partner_id]/learning/tests/results': {
		navigation: 'cogo_academy-tests',
	},
	'/[partner_id]/learning/tests/results/[test_id]': {
		navigation: 'cogo_academy-tests',
	},
	'/[partner_id]/learning/tests/[test_id]': {
		navigation: 'cogo_academy-tests',
	},
};

module.exports = cogoAcademy;
