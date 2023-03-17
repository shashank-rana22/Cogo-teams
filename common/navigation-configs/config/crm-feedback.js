const crmFeedback = {
	'/[partner_id]/crm-feedback-dashboard': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/feedbacks/[organization_id]': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : false,
	},
	'/[partner_id]/requests/[organization_id]': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : false,
	},
};

export default crmFeedback;
