const byodDashboard = {
	'/[partner_id]/byod/employee-dashboard': {
		layoutType : 'no_header',
		navigation : 'byod_dashboard-employee',
		isMainNav  : true,
	},
	'/[partner_id]/byod/employee': {
		layoutType : 'no_header',
		navigation : 'byod_dashboard-employee_list',
		isMainNav  : true,
	},
	'/[partner_id]/byod/employee/[id]': {
		layoutType : 'no_header',
		navigation : 'byod_dashboard-employee_list',
	},
	'/[partner_id]/byod/admin-dashboard': {
		layoutType : 'no_header',
		navigation : 'byod_dashboard-admin_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/byod/admin-dashboard/configuration': {
		layoutType : 'no_header',
		navigation : 'byod_dashboard-admin_dashboard',
		isMainNav  : false,
	},
};
module.exports = byodDashboard;
