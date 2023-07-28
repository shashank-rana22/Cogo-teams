const customerServiceDeskManagement = {
	'/[partner_id]/customer-service-desk-management': {
		navigation : 'customer_service_desk_management',
		isMainNav  : true,
	},
	'/[partner_id]/customer-service-desk-management/create-config': {
		navigation : 'customer_service_desk_management',
		isMainNav  : false,
	},
	'/[partner_id]/customer-service-desk-management/edit-capacity': {
		navigation : 'customer_service_desk_management',
		isMainNav  : false,
	},
};

module.exports = customerServiceDeskManagement;
