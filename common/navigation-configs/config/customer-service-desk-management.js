const customerServiceDeskManagement = {
	'/[partner_id]/customer-service-desk-management': {
		navigation : 'customer_service_desk_management',
		isMainNav  : true,
	},
	'/[partner_id]/customer-service-desk-management/create-config': {
		navigation : 'customer_service_desk_management',
		isMainNav  : false,
	},
	// '/[partner_id]/new-employee-dashboard/add': {
	// 	navigation: 'new_employee_dashboard',
	// },
	// '/[partner_id]/new-employee-dashboard/[profile_id]': {
	// 	navigation: 'new_employee_dashboard',
	// },
};

module.exports = customerServiceDeskManagement;
