const newEmployeeDashboard = {
	'/[partner_id]/new-employee-dashboard': {
		navigation : 'new_employee_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/new-employee-dashboard/add': {
		navigation: 'new_employee_dashboard',
	},
	'/[partner_id]/new-employee-dashboard/[profile_id]': {
		navigation: 'new_employee_dashboard',
	},
};

module.exports = newEmployeeDashboard;
