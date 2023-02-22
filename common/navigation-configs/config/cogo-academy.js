const cogoAcademy = {
	'/[partner_id]/learning/faq/create': {
		navigation : 'cogo_academy-create_faq',
		isMainNav  : true,
	},
	'/[partner_id]/learning/faq/create/configuration': {
		navigation: 'cogo_academy-create_faq',
	},
	'/[partner_id]/learning/faq/create/upload': {
		navigation : 'cogo_academy',
		isMainNav  : false,
	},
	'/[partner_id]/learning/faq': {
		navigation : 'cogo_academy-faq',
		isMainNav  : true,
	},
};

module.exports = cogoAcademy;
