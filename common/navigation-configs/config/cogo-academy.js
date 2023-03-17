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
	'/[partner_id]/learning/faq': {
		navigation : 'cogo_academy-faq',
		isMainNav  : true,
	},
	'/[partner_id]/learning/faq/answer': {
		navigation: 'cogo_academy-faq',
	},
	'/[partner_id]/announcements': {
		navigation : 'cogo_academy-announcements',
		isMainNav  : false,
	},
	'/[partner_id]/announcements/create': {
		navigation : 'cogo_academy-announcements',
		isMainNav  : false,
	},
};

module.exports = cogoAcademy;
