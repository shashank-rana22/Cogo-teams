const serviceManagement = {
	'/[partner_id]/service-management': {
		navigation : 'organization_service_management',
		isMainNav  : true,
	},
	'/[partner_id]/service-management/[service_id]': {
		navigation : 'organization_service_management',
		isMainNav  : false,
	},
};
module.exports = serviceManagement;
