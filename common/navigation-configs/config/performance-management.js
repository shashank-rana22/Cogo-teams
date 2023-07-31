const PERFORMANCE_MANAGEMENT = {
	'/[partner_id]/performance-management/configuration': {
		navigation : 'performance_management-performance_management_configuration',
		isMainNav  : true,
	},
	'/[partner_id]/performance-management/rating-review': {
		navigation: 'performance_management-performance_rating_review',
	},
	'/[partner_id]/performance-management/kra-assignment': {
		navigation: 'performance_management-kra_assignment',
	},
	'/[partner_id]/performance-management/kra-management': {
		navigation: 'performance_management-kra_management',
	},
	'/[partner_id]/performance-management/kra-management/manage-kra': {
		navigation: 'performance_management-kra_management',
	},
	'/[partner_id]/performance-management/kra-management/manage-kra/create-kra': {
		navigation: 'performance_management-kra_management',
	},
	'/[partner_id]/performance-management/kra-management/manage-kra/update-kra/[kra_id]': {
		navigation: 'performance_management-kra_management',
	},
};

module.exports = PERFORMANCE_MANAGEMENT;
