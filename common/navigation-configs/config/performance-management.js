const performanceManagement = {
	'/[partner_id]/performance-management/employee-directory': {
		layoutType : 'no_header',
		navigation : 'performance_management-employee_directory',
	},
	'/[partner_id]/performance-management/user-dashboard': {
		layoutType : 'no_header',
		navigation : 'performance_management-user_dashboard',
	},
	'/[partner_id]/performance-management/manager-dashboard': {
		layoutType : 'no_header',
		navigation : 'performance_management-manager_dashboard',
	},
	'/[partner_id]/performance-management/manager-dashboard/feedback-management/[user_id]': {
		layoutType : 'no_header',
		navigation : 'performance_management-manager_dashboard',
	},
	'/[partner_id]/performance-management/manager-dashboard/feedback-management': {
		layoutType : 'no_header',
		navigation : 'performance_management-manager_dashboard',
	},
	'/[partner_id]/performance-management/hr-dashboard': {
		layoutType : 'no_header',
		navigation : 'performance_management-hr_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/performance-management/hr-dashboard/feedback-forms': {
		layoutType : 'no_header',
		navigation : 'performance_management-hr_dashboard',
	},
	'/[partner_id]/performance-management/hr-dashboard/feedback-management': {
		layoutType : 'no_header',
		navigation : 'performance_management-hr_dashboard',
	},
	'/[partner_id]/performance-management/hr-dashboard/feedback-management/[user_id]': {
		layoutType : 'no_header',
		navigation : 'performance_management-hr_dashboard',
	},
};

module.exports = performanceManagement;
