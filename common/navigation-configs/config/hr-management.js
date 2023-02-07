const feedbackSystem = {
	'/[partner_id]/feedback-system/user-dashboard': {
		layoutType : 'no_header',
		navigation : 'feedback_system-user_dashboard',
		// isMainNav  : true,
	},
	'/[partner_id]/feedback-system/manager-dashboard': {
		layoutType : 'no_header',
		navigation : 'feedback_system-manager_dashboard',
		// isMainNav  : true,
	},
	'/[partner_id]/feedback-system/manager-dashboard/feedback-management/[user_id]': {
		layoutType : 'no_header',
		navigation : 'feedback_system-manager_dashboard',
	},
	'/[partner_id]/feedback-system/manager-dashboard/feedback-management': {
		layoutType : 'no_header',
		navigation : 'feedback_system-manager_dashboard',
	},
	'/[partner_id]/feedback-system/hr-dashboard': {
		layoutType : 'no_header',
		navigation : 'feedback_system-hr_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/feedback-system/hr-dashboard/feedback-management': {
		layoutType : 'no_header',
		navigation : 'feedback_system-hr_dashboard',
		// isMainNav  : false,
	},
	'/[partner_id]/feedback-system/hr-dashboard/feedback-management/[user_id]': {
		layoutType : 'no_header',
		navigation : 'feedback_system-hr_dashboard',
	},
};

module.exports = feedbackSystem;
